const data = require('./catalog.json');
const table = require('markdown-table');

function tableByType(type) {
    let t = [['Image', 'Args', 'Description', 'Example', 'Source', 'Toolchain']];
    data.filter(r => r.type === type).forEach(r => {
        let desc = r.description;
        if (r.demo === true) {
            desc = '[Demo] ' + desc;
        }
        let example = ``;
        if (r.example != undefined) {
          example = `[Example](${r.example})`;
        }
        const source = `[Source](${r.source})`;
        let toolchain = ``;
        if (r.toolchain === "../../../producer/functions/golang/") {
          toolchain = `[Go Library](${r.toolchain})`;
        } else if (r.toolchain === "../../../producer/functions/ts/") {
          toolchain = `[Typescript SDK](${r.toolchain})`;
        } else if (r.toolchain === "../../../producer/functions/starlark/") {
          toolchain = `[Starlark Runtime](${r.toolchain})`;
        }
        t.push([r.image, r.args, desc, example, source, toolchain]);
    });
    return table(t);
}

const README = `---
title: "Functions Catalog"
linkTitle: "Functions Catalog"
weight: 6
type: docs
description: >
    Catalog of Config Functions.
---

<!---
DO NOT EDIT. Generated by: "cd catalog; npm run gen-docs"
-->

This repository documents a catalog of functions implementing the
[Configuration Functions Specification][spec].

Run functions either imperatively or declaratively by following the
[Functions User Guide].

Implement configuration functions using any toolchain such as the
[Typescript SDK][ts sdk] or [Golang Libraries][go libs].

## Sources

See [definition of source functions][source].

${tableByType('source')}

## Sinks

See [definition of sink functions][sink].

${tableByType('sink')}

## Validators

${tableByType('validator')}

## Generators

${tableByType('generator')}

## Transformers

${tableByType('transformer')}

## Next Steps

- Learn more ways of using the kpt fn command from the [reference] doc.
- Get a quickstart on writing functions from the [function producer docs].

[spec]: https://github.com/kubernetes-sigs/kustomize/blob/master/cmd/config/docs/api-conventions/functions-spec.md
[Functions User Guide]: ../
[ts sdk]: ../../../producer/functions/ts/
[go libs]: ../../../producer/functions/golang/
[source]: ../../../../concepts/functions/#source-function
[sink]: ../../../../concepts/functions/#sink-function
[reference]: ../../../../reference/fn/run/
[function producer docs]: ../../../producer/functions/`;

console.log(README);
