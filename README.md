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
