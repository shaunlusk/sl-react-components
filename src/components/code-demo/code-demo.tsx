import React, { FunctionComponent } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

export interface ICodeDemoProps {
    element: any;
    functionReplace?: string;
}

function format(elementString: string, functionReplace?: string): string {
    const allTokens = tokenize(elementString)
    const tokens = stripEmptyTokens(allTokens);
    const tabified = tabify(tokens);
    const result = functionReplace ? replaceFunction(tabified, functionReplace) : tabified;
    return result;
}

function replaceFunction(str: string, replacement: string) {
    return str.replaceAll('function noRefCheck() {}', replacement);
}

function tabify(tokens: string[]): string {
    let stack = 0;
    let result = '';
    for (let token of tokens) {
        if (token.indexOf('<') > -1 && token.indexOf('/') > -1) {
            stack--;
        }
        let tabs = '';
        for (let i = 0; i < stack; i++) tabs += '  ';
        result += `${tabs}${token}\n`;
        if (token.indexOf('<') > -1 && !(token.indexOf('/') > -1)) {
            stack++;
        }
    }
    return result;
}

function stripEmptyTokens(tokens: string[]): string[] {
    const newTokens: string[] = [];
    for (const token of tokens) {
        const result = token.trim();
        if (result && result.length > 0) {
            newTokens.push(result);
        }
    }
    return newTokens;
}

function tokenize(str: string): string[] {
    let i = 0;
    let tokens: string[] = [];

    while (i < str.length) {
        let token = '';
        if (str[i] === '<') {
            do {
                token += str[i++];
            }  while (str[i] !== '>');
            token += str[i++];
        } else {
            while (str[i] !== '<' && i < str.length) {
                if (str[i] === '\r' || str[i] === '\n') {
                    i++;
                    continue;
                }
                token += str[i];
                i++;
            } 
        }
        tokens.push(token);
    }
    return tokens;
}

export const CodeDemo: FunctionComponent<ICodeDemoProps> = ({element, functionReplace}) => {
  return <div>{format(reactElementToJSXString(element), functionReplace)}</div>;
}
