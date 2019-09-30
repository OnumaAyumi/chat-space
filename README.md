## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|sting|null: false|
|email|text|null: false|
|created_at|datetime|null: false|
|update_at|datetime|null: false|



### Association
- has_many :tweets
- has_many :groups,through::groups_users
- has_many :groups_users

## tweetsテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
|text|text|
|image|string|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|created_at|datetime|null: false|
|update_at|datetime|null: false|


### Association
- has_many :users,through::groups_users
- has_many :groups_users
- has_many :tweets

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
