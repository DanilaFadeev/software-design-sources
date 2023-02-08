# Nginx Basic Auth (via Docker)

1. Generate `.htpassed` file in the current directory with Basic Auth credentials for the `admin` user:

```sh
htpasswd -c .htpassed admin
```

2. Run a Docker container with Nginx config and `.htpassed` file:

```sh
docker run --rm -p 3000:80 -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf -v $(pwd)/.htpasswd:/etc/nginx/.htpasswd nginx:1.22.1
```

Some other helpful `htpasswd` commands:

```sh
htpasswd -v .htpasswd admin # verify user's password
htpasswd .htpasswd another_user # add user to the existing config
htpasswd -D .htpasswd another_user # remove specified user
```
