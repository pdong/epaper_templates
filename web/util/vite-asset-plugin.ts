import type { Plugin, ResolvedConfig } from 'vite';
import path from 'path';
import fs from 'fs-extra';
import { buildCppAssetDefinition, buildCppAssetIndex} from './generate-cpp-asset-index';

type ViteAssetPlugin = {
    disable?: boolean;
}

const isFunction = (arg: unknown): arg is (...args: any[]) => any =>
  typeof arg === 'function'

function readAllFile(root: string, reg?: RegExp) {
    let resultArr: string[] = []
    try {
      if (fs.existsSync(root)) {
        const stat = fs.lstatSync(root)
        if (stat.isDirectory()) {
          // dir
          const files = fs.readdirSync(root)
          files.forEach(function (file) {
            const t = readAllFile(path.join(root, '/', file), reg)
            resultArr = resultArr.concat(t)
          })
        } else {
          if (reg !== undefined) {
            if (isFunction(reg.test) && reg.test(root)) {
              resultArr.push(root)
            }
          } else {
            resultArr.push(root)
          }
        }
      }
    } catch (error) {
      throw error
    }
  
    return resultArr
  }

export default function (options: ViteAssetPlugin = {}): Plugin {
    let outputPath: string
    let config: ResolvedConfig

    const pluginName: Plugin = {
        name: 'vite:cppassets',
    }

    if (!!options.disable) return pluginName;


    return {
        ...pluginName, apply: 'build',
        enforce: 'post',
        configResolved(resolvedConfig) {
            config = resolvedConfig
            outputPath = path.isAbsolute(config.build.outDir)
                ? config.build.outDir
                : path.join(config.root, config.build.outDir)
        },
        closeBundle: {
            order: 'post',
            sequential: true,
            async handler() {
                let files = readAllFile(outputPath) || []
    
                const assetDefns = files
                    .filter(filename => filename.endsWith(".gz"))
                    .map(async (filePath: string) => {
                        let source = await fs.readFileSync(filePath);
                        const buildFilepath = filePath.replace(/\\/g, "/").split(`${config.build.outDir}/`)[1];
                        return buildCppAssetDefinition(buildFilepath, source);
                    })
                Promise.all(assetDefns).then(async values => {
                    const cppAssetIndex = buildCppAssetIndex(values);
    
                    await fs.writeFile(`${config.build.outDir}/web_assets.h`, cppAssetIndex)
                })
            
            }
        }
    };
}