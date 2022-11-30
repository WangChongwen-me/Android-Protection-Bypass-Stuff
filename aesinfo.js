// https://codeshare.frida.re/@dzonerzy/aesinfo/
// append raw console log plain encoded

Java.perform(function () {

    let MainActivity = Java.use("com.example.supermarket.MainActivity");
    MainActivity["stringFromJNI"].implementation = function () {
        console.log('stringFromJNI is called');
        let ret = this.stringFromJNI();
        console.log('stringFromJNI ret value is ' + ret);
        return ret;
    };


    let MainActivity2 = Java.use("com.example.supermarket.MainActivity");
    MainActivity["stringFromJNI2"].implementation = function () {
        console.log('stringFromJNI2 is called');
        let ret = this.stringFromJNI2();
        console.log('stringFromJNI2 ret value is ' + ret);
        return ret;
    };


    let MainActivity3 = Java.use("com.example.supermarket.MainActivity");
    MainActivity["stringFromJNI3"].implementation = function () {
        console.log('stringFromJNI3 is called');
        let ret = this.stringFromJNI3();
        console.log('stringFromJNI3 ret value is ' + ret);
        return ret;
    };

    let b = Java.use("com.example.supermarket.MainActivity$b");
    b["onTextChanged"].implementation = function (charSequence, i2, i3, i4) {
        console.log('onTextChanged is called' + ', ' + 'charSequence: ' + charSequence + ', ' + 'i2: ' + i2 + ', ' + 'i3: ' + i3 + ', ' + 'i4: ' + i4);
        let ret = this.onTextChanged(charSequence, i2, i3, i4);
        console.log('onTextChanged ret value is ' + ret);
        return ret;
    };

})



Java.perform(function() {

    var use_single_byte = false;
    var complete_bytes = new Array();
    var index = 0;


    var secretKeySpecDef = Java.use('javax.crypto.spec.SecretKeySpec');

    var ivParameterSpecDef = Java.use('javax.crypto.spec.IvParameterSpec');

    var cipherDef = Java.use('javax.crypto.Cipher');

    var cipherDoFinal_1 = cipherDef.doFinal.overload();
    var cipherDoFinal_2 = cipherDef.doFinal.overload('[B');
    var cipherDoFinal_3 = cipherDef.doFinal.overload('[B', 'int');
    var cipherDoFinal_4 = cipherDef.doFinal.overload('[B', 'int', 'int');
    var cipherDoFinal_5 = cipherDef.doFinal.overload('[B', 'int', 'int', '[B');
    var cipherDoFinal_6 = cipherDef.doFinal.overload('[B', 'int', 'int', '[B', 'int');

    var cipherUpdate_1 = cipherDef.update.overload('[B');
    var cipherUpdate_2 = cipherDef.update.overload('[B', 'int', 'int');
    var cipherUpdate_3 = cipherDef.update.overload('[B', 'int', 'int', '[B');
    var cipherUpdate_4 = cipherDef.update.overload('[B', 'int', 'int', '[B', 'int');

    var secretKeySpecDef_init_1 = secretKeySpecDef.$init.overload('[B', 'java.lang.String');

    var secretKeySpecDef_init_2 = secretKeySpecDef.$init.overload('[B', 'int', 'int', 'java.lang.String');

    var ivParameterSpecDef_init_1 = ivParameterSpecDef.$init.overload('[B');

    var ivParameterSpecDef_init_2 = ivParameterSpecDef.$init.overload('[B', 'int', 'int');

    secretKeySpecDef_init_1.implementation = function(arr, alg) {
        var key = b2s(arr);
        send("Creating " + alg + " secret key, plaintext:\\n" + hexdump(key));
        return secretKeySpecDef_init_1.call(this, arr, alg);
    }

    secretKeySpecDef_init_2.implementation = function(arr, off, len, alg) {
        var key = b2s(arr);
        send("Creating " + alg + " secret key, plaintext:\\n" + hexdump(key));
        return secretKeySpecDef_init_2.call(this, arr, off, len, alg);
    }

    /*ivParameterSpecDef_init_1.implementation = function(arr)
    {
        var iv = b2s(arr);
        send("Creating IV:\\n" + hexdump(iv));
        return ivParameterSpecDef_init_1.call(this, arr);
    }

    ivParameterSpecDef_init_2.implementation = function(arr, off, len)
    {
        var iv = b2s(arr);
        send("Creating IV, plaintext:\\n" + hexdump(iv));
        return ivParameterSpecDef_init_2.call(this, arr, off, len);
    }*/

    cipherDoFinal_1.implementation = function() {
        var ret = cipherDoFinal_1.call(this);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipherDoFinal_2.implementation = function(arr) {
        addtoarray(arr);
        var ret = cipherDoFinal_2.call(this, arr);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipherDoFinal_3.implementation = function(arr, a) {
        addtoarray(arr);
        var ret = cipherDoFinal_3.call(this, arr, a);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipherDoFinal_4.implementation = function(arr, a, b) {
        addtoarray(arr);
        var ret = cipherDoFinal_4.call(this, arr, a, b);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipherDoFinal_5.implementation = function(arr, a, b, c) {
        addtoarray(arr);
        var ret = cipherDoFinal_5.call(this, arr, a, b, c);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, ret);
        return ret;
    }

    cipherDoFinal_6.implementation = function(arr, a, b, c, d) {
        addtoarray(arr);
        var ret = cipherDoFinal_6.call(this, arr, a, b, c, d);
        info(this.getIV(), this.getAlgorithm(), complete_bytes, c);
        return ret;
    }

    cipherUpdate_1.implementation = function(arr) {
        addtoarray(arr);
        return cipherUpdate_1.call(this, arr);
    }

    cipherUpdate_2.implementation = function(arr, a, b) {
        addtoarray(arr);
        return cipherUpdate_2.call(this, arr, a, b);
    }

    cipherUpdate_3.implementation = function(arr, a, b, c) {
        addtoarray(arr);
        return cipherUpdate_3.call(this, arr, a, b, c);
    }

    cipherUpdate_4.implementation = function(arr, a, b, c, d) {
        addtoarray(arr);
        return cipherUpdate_4.call(this, arr, a, b, c, d);
    }

    function info(iv, alg, plain, encoded) {
        send("Performing encryption/decryption");
        if (iv) {
            send("Initialization Vector: \\n" + hexdump(b2s(iv)));
        } else {
            send("Initialization Vector: " + iv);
        }
        send("Algorithm: " + alg);
        send("In: \\n" + hexdump(b2s(plain)));
        send("Out: \\n" + hexdump(b2s(encoded)));
        send("In: \\n" + console.log(b2s(plain)));
        send("Out: \\n" + console.log(b2s(encoded)));
        complete_bytes = [];
        index = 0;
    }

    function hexdump(buffer, blockSize) {
        blockSize = blockSize || 16;
        var lines = [];
        var hex = "0123456789ABCDEF";
        for (var b = 0; b < buffer.length; b += blockSize) {
            var block = buffer.slice(b, Math.min(b + blockSize, buffer.length));
            var addr = ("0000" + b.toString(16)).slice(-4);
            var codes = block.split('').map(function(ch) {
                var code = ch.charCodeAt(0);
                return " " + hex[(0xF0 & code) >> 4] + hex[0x0F & code];
            }).join("");
            codes += "   ".repeat(blockSize - block.length);
            var chars = block.replace(/[\\x00-\\x1F\\x20]/g, '.');
            chars += " ".repeat(blockSize - block.length);
            lines.push(addr + " " + codes + "  " + chars);
        }
        return lines.join("\\n");
    }

    function b2s(array) {
        var result = "";
        for (var i = 0; i < array.length; i++) {
            result += String.fromCharCode(modulus(array[i], 256));
        }
        return result;
    }

    function modulus(x, n) {
        return ((x % n) + n) % n;
    }

    function addtoarray(arr) {
        for (var i = 0; i < arr.length; i++) {
            complete_bytes[index] = arr[i];
            index = index + 1;
        }
    }
});
