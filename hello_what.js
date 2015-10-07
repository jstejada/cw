var helloWorld = function () {
  // Hello world!
  var buf = new Buffer(12);
  buf.writeIntBE(0x48, 0, 1);
  buf.writeIntBE(0x65, 1, 1);
  buf.writeIntBE(0x6c, 2, 1);
  buf.writeIntBE(0x6c, 3, 1);
  buf.writeIntBE(0x6f, 4, 1);
  buf.writeIntBE(0x20, 5, 1);
  buf.writeIntBE(0x57, 6, 1);
  buf.writeIntBE(0x6f, 7, 1);
  buf.writeIntBE(0x72, 8, 1);
  buf.writeIntBE(0x6c, 9, 1);
  buf.writeIntBE(0x64, 10, 1);
  buf.writeIntBE(0x21, 11, 1);
  return buf.toString()
}

console.log(helloWorld())
