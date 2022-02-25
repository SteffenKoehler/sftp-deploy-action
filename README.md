# GitHub sftp deploy action

GitHub action for sftp deployments

## 🤓 How to use

``` yml
- name: SFTP Deploy
  uses: SteffenKoehler/sftp-deploy-action@v1.0
  with:
    host: ${{ secrets.FTP_HOST }} 
    port: 21 # optional, default is: 21
    username: ${{ secrets.FTP_USERNAME }} # FTP username
    password: ${{ secrets.FTP_PASSWORD }} # FTP password
    remoteDir: remoteDir # optional, default './'
    localDir: dist # optional, default dist
    cleanup: false # optional, delete existing files inside FTP remote folder
```

## 💡 Inspiration
https://github.com/sand4rt/ftp-deployer

## 💬 Note
The project is just a simple action that works and is sufficient for my use case. I am not planning to add any more features at the moment. For that, please have a look at the linked action.