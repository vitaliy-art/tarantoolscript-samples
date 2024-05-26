// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/

import * as fio from 'fio';
import * as buffer from 'buffer';


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.pathjoin
fio.pathjoin('/etc/', 'default', 'myfile'); // /etc/default/myfile


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.basename
fio.basename('/path/to/my.lua', '.lua'); // my
fio.basename('/path/to/'); //


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.dirname
fio.dirname('/path/to/my.lua'); // '/path/to/'


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.abspath
fio.abspath('my.lua'); // '/path/to/my.lua'


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.umask
fio.umask(tonumber('755', 8)!); // 493


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.stat
fio.lstat('/etc');
//   inode: 1048577
//   rdev: 0
//   size: 12288
//   atime: 1421340698
//   mode: 16877
//   mtime: 1424615337
//   nlink: 160
//   uid: 0
//   blksize: 4096
//   gid: 0
//   ctime: 1424615337
//   dev: 2049
//   blocks: 24


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.mkdir
fio.mkdir('/etc'); // false


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.chdir
fio.chdir('/etc'); // true


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.listdir
fio.listdir('/usr/lib/tarantool'); // - - mysql


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.glob
fio.glob('/etc/x*');
// - - /etc/xdg
//   - /etc/xml
//   - /etc/xul-ext


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.tempdir
fio.tempdir(); // - /tmp/lG31e7
fio.mkdir('./mytmp'); // - true
/** @todo implement module os */
// os.setenv('TMPDIR', './mytmp');
fio.tempdir(); // - ./mytmp/506Z0b


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.cwd
fio.cwd(); // - /home/username/tarantool_sandbox


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.copytree
fio.copytree('/home/original', '/home/arghives'); // - true


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.mktree
fio.mktree('/home/archives'); // - true


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.rmtree
fio.rmtree('/home/archives'); // - true


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.link
fio.link('/home/username/tmp.txt', '/home/username/tmp.txt2'); // - true
fio.unlink('/home/username/tmp.txt2'); // - true


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.link
fio.rename('/home/username/tmp.txt', '/home/username/tmp.txt2'); // - true


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.utime
fio.utime('/home/username/tmp.txt'); // - true


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.copyfile
fio.copyfile('/home/username/tmp.txt', 'home/username/tmp.txt2'); // - true


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.chown
fio.chmod('/home/username/tmp.txt', tonumber('0755', 8)!); // - true
fio.chown('/home/username/tmp.txt', 'username', 'username'); // - true


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.truncate
fio.truncate('/home/username/tmp.txt', 99999); // - true


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.sync
fio.sync(); // - true


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.fio.open
const [fh] = fio.open('/home/username/tmp.txt', ['O_RDWR', 'O_APPEND']);
fh; // - fh: 11
fio.open('x.txt', ['O_WRONLY', 'O_CREAT'], tonumber('644', 8)); // - fh: 12


if (!fh) {
    throw 'error';
}


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.file-handle.close
fh.close();


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.file-handle.pread
fh.pread(25, 25);
// - |
//   elete from t8//
//   insert in


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.file-handle.pwrite
let ibuf = buffer.ibuf();
fh.pwrite(ibuf, 1, 0); // - true


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.file-handle.read
ibuf = buffer.ibuf();
fh.read(ibuf.reserve(5), 5); // - 5
/** @todo implement module ffi */
// ffi.string(ibuf.alloc(5), 5); // - abcde


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.file-handle.write
fh.write('new data'); // - true
fh.write(ibuf, 1); // - true


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.file-handle.truncate
fh.truncate(0); // - true


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.file-handle.seek
fh.seek(20, 'SEEK_SET'); // - 20


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.file-handle.stat
fh.stat();
// - inode: 729866
//   rdev: 0
//   size: 100
//   atime: 140942855
//   mode: 33261
//   mtime: 1409430660
//   nlink: 1
//   uid: 1000
//   blksize: 4096
//   gid: 1000
//   ctime: 1409430660
//   dev: 2049
//   blocks: 8


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-function.file-handle.fdatasync
fh.fdatasync(); // - true


// https://www.tarantool.io/ru/doc/latest/reference/reference_lua/fio/#lua-data.fio.c
fio.c;
// - seek:
//     SEEK_SET: 0
//     SEEK_DATA: 3
//     SEEK_HOLE: 4
//     SEEK_END: 2
//     SEEK_CUR: 1
//   mode:
//     S_IWGRP: 16
//     S_IXGRP: 8
//     S_IROTH: 4
//     S_IXOTH: 1
//     S_IRUSR: 256
//     S_IXUSR: 64
//     S_IRWXU: 448
//     S_IRWXG: 56
//     S_IWOTH: 2
//     S_IRWXO: 7
//     S_IWUSR: 128
//     S_IRGRP: 32
//   flag:
//     O_NONBLOCK: 2048
//     O_RDONLY: 0
//     O_DIRECTORY: 65536
//     O_WRONLY: 1
//     O_ASYNC: 8192
//     O_DIRECT: 16384
//     O_TMPFILE: 4259840
//     O_EXCL: 128
//     O_PATH: 2097152
//     O_SYNC: 1052672
//     O_NOCTTY: 256
//     O_CLOEXEC: 524288
//     O_TRUNC: 512
//     O_NOFOLLOW: 131072
//     O_RDWR: 2
//     O_LARGEFILE: 0
//     O_CREAT: 64
//     O_APPEND: 1024
//     O_NOATIME: 262144
//     O_NDELAY: 2048
