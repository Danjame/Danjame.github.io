## PetitCodeur

Bonjour, bienvenue sur ma gage.



### 学习笔记

**Github 使用教程                        05/03/2019**
```markdown
自学前端半年了，今天才对github的使用有了初步了解，于是根据自己的经验总结了使用方法。

1. 进入 github 的网站 [https://github.com/] 注册帐号。

2. 下载安装 git [https://git-scm.com/downloads] 。

3. 打开终端输入 `git --version` 指令可查看已安装git的版本。

4. 查看.ssh: 在终端输入指令 `cd ~/.ssh`。如果提示 `-bash:cd: ～/.ssh: No such file or directory` ，
说明ssh不存在，则需要创建一个。在终端输入指令 `ssh-keygen -t rsa -C email`，email写注册帐号时的邮箱地址。
回车之后会出现以下提示:
   `Generating public/private rsa key pair.`
   `Enter file in which to save the key (/Users/username/.ssh/id_rsa):`（此为默认路径，可不修改）
   `Created directory '/Users/username/.ssh'.`
   `Enter passphrase (empty for no passphrase):` （设置4位以上的密码）
   `Enter same passphrase again:` （再次输入密码以确认）
   `Your identification has been saved in /Users/username/.ssh/id_rsa`

5. 回到github网站登录帐号，右上角用户头像点击选择 **Settings**，然后点击左边 **Personal settings** 一栏
中的 **SSH and GPG keys**，进入之后选择 **New SSH key**，然后填写Title和Key。
   **Title**: 可填写注册邮箱地址
   **Key**: 进入目录 _/User/username/.ssh/_ 找到 _is_rsa.pub_，用文本编辑器打开，拷贝里面的内容即可。(
   打开Finder使用快捷键_Command + Shift + h_ 进入用户根目录，再使用快捷键 _Command + Shift + ._ 取消文
   件隐藏即可找到_is_rsa.pub_文件)
   最后点击 **Add SSH key**。
   
6. 创建版本库，回到github个人主页，点击位于中央的 **Start a project**, 在 **Repository name** 处输入一
个版本库名称，点击**Create repository**。

7. 成功创建版本库之后，在终端使用“cd /文件夹路径” 选择你想建立本地版本库的文件夹路径，比如我的是项目是在桌面的
文件夹myGit,则输入 `cd /Users/username/Desktop/myGit`，然后按照github上新库的提示 _…or create a new 
repository on the command line_ 依次输入指令，比如我的是:
    `echo "# MonGit" >> README.md`
    `git init`
    `git add README.md`
    `git commit -m "first commit"`
    `git remote add origin https://github.com/username/myGit.git`
    `git push -u origin master`
然后会出现以下提示：
    `Username for 'https://github.com':` （输入github上的用户名）
    `Password for 'https://username@github.com':` （输入github的登录密码）
    
8. 提交项目，打开终端，同样利用cd指令进入本地仓库，输入:
    `git add 文件/文件夹路径`
    `git commit –m “你的注释”`
    `git push origin master`
成功执行后会显示几行数据，最后以 `master -> master` 结束。
```

```Markdown
    
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/Danjame/Danjame.github.io/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://help.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out.
