# Android Protection Bypass Stuff
Android Protection Bypass Stuff that I compiled from few resources.

## Good tools cheatsheet

Good cheatsheet compilation for mobile pentest

https://github.com/mirfansulaiman/Command-Mobile-Penetration-Testing-Cheatsheet


## SSL Pinning bypass

Most completed SSL pinning bypass

https://codeshare.frida.re/@akabe1/frida-multiple-unpinning/


## Encryption AES or ETC

Can relied on this

https://codeshare.frida.re/@dzonerzy/aesinfo/


## Magisk Alpha

Main magisk released now did not had magiskhide feature. However this feature is exist on magisk alpha (Use this on pentest environtment devices only)

https://t.me/magiskalpha


## Frida detection bypass

Use this frida. Make sure version used same with frida cli version that exist on ur machine

https://github.com/CrackerCat/strongR-frida-android

## APK decompiler

Mainly use jadx gui. Had amazing feature copy as frida snippet or xposed snippet. Fast string search and decompiler speed.

https://github.com/skylot/jadx

If APK did not decompiled well with jadx gui, use bytecode-viewer as alternative. Bytecode-Viewer had many decompiler tools inside.

https://github.com/Konloch/bytecode-viewer

## Hook runtime dex

I write article for this on CTF writeup here - https://maulvialf.medium.com/write-up-intechctf-android-game-3024629af286. TLDR script on below

```javascript
Java.perform(function () {
    var dalvik_system_BaseDexClassLoader = Java.use('dalvik.system.BaseDexClassLoader');
    dalvik_system_BaseDexClassLoader.$init.overload('java.lang.String', 'java.lang.String', 'java.lang.ClassLoader', '[Ljava.lang.ClassLoader;', 'boolean').implementation = function (dexPath, librarySearchPath, parent, sharedLibraryLoaders, isTrusted) {
        console.log('BaseDexClassLoader: ' + dexPath);
        this.$init(dexPath, librarySearchPath, parent, sharedLibraryLoaders, isTrusted);
        // Save the old class loader reference
        var oldLoader = Java.classFactory.loader;
        try {
            Java.classFactory.loader = this;
            // add your hook in here


            // end hook
        } catch (Exception) {
            console.log('Exception: ' + Exception);
        }
        // Restore the old class loader reference
        Java.classFactory.loader = oldLoader;
    }

});
```

## Get dex and defeat packer

Use this, and you would get dex files from packer

https://github.com/enovella/fridroid-unpacker.git

## Library dumper

Use this to dump library from memory and fixing broken memory

https://github.com/lasting-yang/frida_dump

## Flutter SSL Pinning bypass

Self explanatory

https://github.com/Impact-I/reFlutter

## Hook native lib with function name

```javascript
// "use strict";
var didHookApis = false;
Java.perform(function() {
    // Credit to @enovella:
    // https://github.com/frida/frida/issues/434#issuecomment-423822024
    const System = Java.use("java.lang.System");
    const Runtime = Java.use('java.lang.Runtime');
    const SystemLoadLibrary = System.loadLibrary.overload('java.lang.String');
    const VMStack = Java.use('dalvik.system.VMStack');
    SystemLoadLibrary.implementation = function(library) {
        const loaded = Runtime.getRuntime().loadLibrary0(
            VMStack.getCallingClassLoader(), library
        );
        if (library.includes("konyjsvm")) {
            console.log("[+] Hooked konyjsvm");
            hookFunctions();
        }
        return loaded;
    }
});

function hookFunctions() {
    Interceptor.attach(Module.getExportByName("libkonyjsvm.so", "lzf"), {
        onEnter: function(args) {
            // console.log("[+] Hooked ziping files!");
            this.zipfiles = args[2]
            this.ziplength = args[3]            
        },
        onLeave: function(retval) {
            send("================")
            console.log("zip files length", this.ziplength)
            var readzipfiles = Memory.readByteArray(this.zipfiles, this.ziplength.toInt32() );
            // send("zipfiles", readzipfiles)
            var file = new File("/data/data/com.apk.alfan/" + inc + ".zip","w");
            inc += 1;
            file.write(readzipfiles);
        }
})}  
```

## Hook native library with address

```javascript
// "use strict";
var didHookApis = false;
Java.perform(function() {
    // Credit to @enovella:
    // https://github.com/frida/frida/issues/434#issuecomment-423822024
    const System = Java.use("java.lang.System");
    const Runtime = Java.use('java.lang.Runtime');
    const SystemLoadLibrary = System.loadLibrary.overload('java.lang.String');
    const VMStack = Java.use('dalvik.system.VMStack');
    SystemLoadLibrary.implementation = function(library) {
        const loaded = Runtime.getRuntime().loadLibrary0(
            VMStack.getCallingClassLoader(), library
        );
        if (library.includes("intechfest")) {
            console.log("[+] Hooked library");
            hookFunctions();
        }
        return loaded;
    }
});
var inc = 0;
function hookFunctions() {

    const ghidraImageBase = 0x00040000; // example value get the real value in Ghidra from Window -> Memory map -> Set Image Base
    const moduleName = "libintechfest.so";
    const moduleBaseAddress = Module.findBaseAddress(moduleName);
    const functionRealAddress = moduleBaseAddress.add(0x000000000001003C); // SSM::Decrypt

    Interceptor.attach(functionRealAddress, {
        onEnter: function(args) {
        },
        onLeave: function(retval) {
            send("================")
            var one = ptr(retval).readCString();
            send(one)
        }
    })    
};
```


## APKLab

Vscode extension that make patching smali easy

https://github.com/APKLab/APKLab

## IDA Frida

Wanna export frida script on native binary? use this

https://github.com/P4nda0s/IDAFrida


## Frida Typescript

Wanna use code completion on writing frida scripts. Use typescripts

https://github.com/oleavr/frida-agent-example.git
