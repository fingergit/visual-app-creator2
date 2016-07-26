<?php
class IndexAction extends BaseAction {
    public function index(){
//      header("X-Frame-Options: ALLOW-FROM http://localhost:63342");
//      echo header("Access-Control-Allow-Origin: *");
      header( 'Access-Control-Allow-Origin:*' );
        $this->hello = "abcdefg";
	    $this->display();
    }

    public function frame(){
        // 以下方式获取Request Payload json格式的数据。
        $data = file_get_contents("php://input"); // json字符串
        $obj = json_decode($data); // 转换为对象。
        logInfo($obj->html); // a为对象属性。
//        logInfo($data);

        logInfo($_POST);
        S('html', $obj->html);

        $user = array(
            'name' => 'zhangsan'
        );
        $this->ajaxReturn($user, 'json');
    }

    public function appframe(){
        $this->html = S('html');
        S('html', null);
        $this->display();
    }

  public function upload(){
    logInfo('upload');
    logInfo($_FILES);
    import('ORG.Net.UploadFile');
    $upload = new UploadFile();// 实例化上传类
    $upload->maxSize  = 1*1024*1024 ;// 设置附件上传大小
    $upload->allowExts  = array('jpg', 'jpeg', 'bmp', 'png');// 设置附件上传类型
    $upload->uploadReplace = true; //存在同名文件是否是覆盖
    $upload->thumb = true;
    $upload->thumbType = 0;
    $upload->thumbMaxWidth = "640";
    $upload->thumbMaxHeight = "640";
    $upload->savePath = dirname($_SERVER['SCRIPT_FILENAME']).C('APP_UPLOAD');// 设置附件上传目录
    logInfo('up path: ' . $upload->savePath);
    $info = array();

//    $info['error'] = 'OK';
//    $info['errorkeys'] = [0];
    if(!$upload->upload()) {// 上传错误提示错误信息
      $info['error'] = $upload->getErrorMsg();
      $info['errorkeys'] = [0];
    }else{// 上传成功 获取上传文件信息
      $infoFile =  $upload->getUploadFileInfo();
      logInfo('info file: ');
      logInfo($infoFile);
      $info['url'] = __ROOT__ . C('APP_UPLOAD') . $infoFile['0']['savename'];
//      $info['initialPreview'] = [
//        sprintf("<img src='%s' class='file-preview-image' alt='Desert' title='Desert'>", __ROOT__ . C('APP_UPLOAD') . $infoFile['0']['savename'])
//      ];
//      $info['initialPreviewConfig'][] = array(
//        'caption' => 'desert.jpg',
//        'width'=> '10px',
////        'url'=> 'http://localhost/avatar/delete', // server delete action
//        'key'=>100,
//        'extra'=> array('id'=> 100)
//      );
    }

    logInfo($info);

    $this->ajaxReturn($info, 'json');
  }
}
