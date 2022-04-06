unset AWS_SESSION_TOKEN
unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_ACCESS_KEY
unset AWS_PROMPT
 
HOSTNAME=$(hostname)

temp_role=$(aws sts assume-role \
                    --role-arn "arn:aws:iam::841909260160:role/developer" \
                    --role-session-name "${HOSTNAME}-Developer" \
                    --profile sso)

export AWS_ACCESS_KEY_ID=$(echo $temp_role | jq .Credentials.AccessKeyId | xargs)
export AWS_SECRET_ACCESS_KEY=$(echo $temp_role | jq .Credentials.SecretAccessKey | xargs)
export AWS_SESSION_TOKEN=$(echo $temp_role | jq .Credentials.SessionToken | xargs)