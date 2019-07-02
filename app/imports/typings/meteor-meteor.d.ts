/* eslint-disable */
declare module 'meteor/meteor' {
  namespace Meteor {
    const isAppTest: boolean;
  }
  namespace Accounts {
    function removeDefaultRateLimit(): any;
  }
 namespace Assets {
     export function getBinary(assetPath: string, asyncCallback?: () => void): EJSON;

     export function getText(assetPath: string, asyncCallback?: () => void): string;

    export function absoluteFilePath(assetPath: string): string;
  }
}
