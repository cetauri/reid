# API end point

## - 기본 페이지

```
GET ~/
```


### Response

```
Hello, I`m Dr. Spencer Reid
```





## - 상태 모니터링

* 서버의 위치
* pid
* uptime
* 메모리 사용량
* node.js 설정
* mode

```
GET ~/__info
```

### Response
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






## - 데이터 저장 
```
POST ~/cache
```


### Parameters

|Name |	Description	|Mandatory|Example| 
------|-----|----|-----|
|key 	| 키(key)	| Required	| cetauri	|
|value	| 값(value)	| Required	| 1979	|
|ttl 	| Time to Live, 초단위  | Optional (기본 1달 : 2592000)	| 5	|


### Response

```
{
    "status": 0
}
```

## - 1개 데이터 가져오기
```
GET ~/cache
```

### Input Parameters

|Name |	Description	|Mandatory|Example| 
------|-----|----|-----|
|key 	| 키(key)	| Required	| cetauri	|

### Response

```
{
	"status": 0
	"value": "1979"
}
```

## - 여러 데이터 가져오기
```
GET ~/cache?key=cetauri&key=toto
```

### Response

```
{
    "status": 0,
    "list": [
        {
            "key": "cetauri",
            "value": "권오상"
        },
        {
            "key": "toto",
            "value": "김태호"
        }
    ]
}
```

## - 데이터 삭제
```
DELETE ~/cache
```

### Input Parameters

|Name |	Description	|Mandatory|Example| 
------|-----|----|-----|
|key 	| 키(key)	| Required	| cetauri	|

### Response

```
{
    "status": 0
}
```



## - 에러


### Response

```
{
    "status": -1,
    "message": "Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED"
}
```

