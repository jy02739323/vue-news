<?php 
		header("Access-Control-Allow-Origin: *");
        //数据校验
        //获取当前的用户名和密码
        $name = $_POST['username'];
        $psw = $_POST['password'];
        

        //1获取数据库中的用户信息
        $con = new mysqli('127.0.0.1','root','','appuser');
        // 查询表
        $sql = 'select * from user';
        $res = $con->query($sql);
        $bool = false;
        if($res->num_rows>0){
        	while ( $row = $res->fetch_assoc() ) {
        		if($row['username'] == $name && $row['password'] == $psw){
                    $bool=true;
                }
                if($row['username'] == $name && $row['password'] != $psw){
                	$bool=false;
                }
        	}
        }
        if($bool){
        	echo "登录成功";
        }else{
        	echo "登录失败";
        }
 ?>