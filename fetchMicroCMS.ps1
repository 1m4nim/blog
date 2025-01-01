# MicroCMSのAPIキーを設定
$headers = @{
    "X-MICROCMS-API-KEY" = "X8WxIKj3l8ttXbqQ5V4q8zXXyQWV5Rc5aW2H"
}

# APIエンドポイントを設定
$uri = "https://3wm94pke18.microcms.io/api/v1/blogs"

# APIリクエストを送信
$response = Invoke-WebRequest -Uri $uri -Headers $headers

# レスポンスをJSON形式に変換
$data = $response.Content | ConvertFrom-Json

# 取得したブログデータを表示
$data.contents
