# API end point

## ~/
기본 페이지
```
Hello, I`m Dr. Spencer Reid
```

## ~/cache
Cache  컨트롤 
- Post

|params |	value| desc.|
------|-----|----
|key  |	cetauri| 키(key)
|value |	1979| 값(value)
|ttl |	5| Time to Live, 초단위 

```
{
    "status": 0
}
```
- Get

|params |	value|
------|-----
|key  |cetauri|

```
{
	"status": 0
	"value": "1979"
}
```


- Delete

|params |	value|
------|-----
|key  |cetauri|

```
{
    "status": 0
}
```



## ~/__info
상태 모니터링
```
{
    "hostname": "cetauriui-MacBook-Pro.local",
    "pid": 26234,
    "uptime": 6,
    "memory": {
        "rss": 25563136,
        "heapTotal": 18635008,
        "heapUsed": 7508480
    },
    "package": {
        "name": "reid",
        "description": "Dr. Spencer Reid",
        "version": "0.1.1",
        "private": true,
        "scripts": {
            "start": "NODE_ENV=production node app.js"
        },
        "dependencies": {
            "express": "4.x",
            "redis": "*"
        }
    },
    "env": "development"
}
```