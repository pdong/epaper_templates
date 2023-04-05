type CppAssetDefinition = {
  progmemSourceVar: string;
  progmemDefinition: string;
  pathVar: string;
  pathDefinition: string;
  length: number;
  lengthVar: string;
  lengthDefinition: string;
  source: Buffer;
  assetPath: string;
  extension: Array<string>;
}

export const buildCppAssetDefinition = (filename: string, source: Buffer): CppAssetDefinition => {
  const assetPath = filename.replace(/.gz$/, "");
  const baseName = filename
    .replace(/[^a-zA-Z0-9]/g, '_')
    .toUpperCase()
  const sourceBytes = new Int16Array(source)

  const pathVar = `${baseName}_PATH`
  const pathDefinition = `static const char ${pathVar}[] = "/${assetPath}";`

  const progmemSourceVar = baseName
  const progmemDefinition = `static const uint8_t ${progmemSourceVar}[] PROGMEM = { ${sourceBytes.join(",")} };`

  const lengthVar = `${baseName}_LENGTH`
  const lengthDefinition = `static const size_t ${lengthVar} = ${source.length};`

  return {
    progmemSourceVar,
    progmemDefinition,
    pathVar,
    pathDefinition,
    length: source.length,
    lengthVar,
    lengthDefinition,
    source,
    assetPath,
    extension: assetPath.split('.').slice(-1)
  }
}

export const buildCppAssetIndex = (definitions: Array<CppAssetDefinition>) => {
  const contentTypesByExtension: {[extension: string]: string } = {
    html: "text/html",
    js: "text/javascript",
    css: "text/css"
  }
  const source = `#include <map>
#include <cstring>

#ifndef _CHAR_COMPARATOR_H
#define _CHAR_COMPARATOR_H
struct cmp_str {
  bool operator()(char const *a, char const *b) const {
      return std::strcmp(a, b) < 0;
  }
};
#endif

${definitions.map(x => x.pathDefinition).join("\n")}
${definitions.map(x => x.progmemDefinition).join("\n")}
${definitions.map(x => x.lengthDefinition).join("\n")}
static const std::map<const char*, const char*, cmp_str> WEB_ASSET_CONTENT_TYPES = {\n${
  definitions
    .map(definition => `{${definition.pathVar},"${contentTypesByExtension[definition.extension[0]]}"}`)
    .join(",\n")
}\n};
static const std::map<const char*, size_t, cmp_str> WEB_ASSET_LENGTHS = {\n${
  definitions
    .map(x => `{${x.pathVar},${x.lengthVar}}`)
    .join(",\n")
}\n};
static const std::map<const char*, const uint8_t*> WEB_ASSET_CONTENTS = {\n${
  definitions
    .map(x => `{${x.pathVar},${x.progmemSourceVar}}`)
    .join(",\n")
}\n};
`
  return source;
}


