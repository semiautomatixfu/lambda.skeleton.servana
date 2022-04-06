#!/bin/bash
# ------------------------------------------------------------------
# [Author] Mick
#          Setup SSM params in aws
# ------------------------------------------------------------------

VERSION=0.1.0
SUBJECT=GET_FU_SSM_SCRIPT

# --- Help message -------------------------------------------------
function show_help {
    echo "usage:  $BASH_SOURCE --stage master --ssm_param SOME_PARAM --secure_ssm_param SOME_SECURE_PARAM"
    echo "'stage' is master, YOUR_USERNAME, etc"
    echo "'ssm_param' is the parameter you want to add"
    echo "'secure_ssm_param' is the encrypted parameter you want to add"
}

# --- Script Default value -----------------------------------------
stage=''
ssm_param=''
secure_ssm_param=''

# --- Options processing -------------------------------------------
optspec="h-:"
while getopts "$optspec" optchar; do
    case "${optchar}" in
        -)
            case "${OPTARG}" in
                help)
                  show_help
                  exit 2
                  ;;
                stage)
                    val="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
                    stage="$val"
                    ;;
                ssm_param)
                    val="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
                    ssm_param="$val"
                    ;;
                secure_ssm_param)
                    val="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
                    secure_ssm_param="$val"
                    ;;
                *)
                    if [ "$OPTERR" = 1 ] && [ "${optspec:0:1}" != ":" ]; then
                        echo "Unknown option --${OPTARG}" >&2
                    fi
                    show_help;
                    exit 2
                    ;;
            esac;;
        h)
            show_help
            exit 2
            ;;
        *)
            if [ "$OPTERR" != 1 ] || [ "${optspec:0:1}" = ":" ]; then
                echo "Non-option argument: '-${OPTARG}'" >&2
            fi
            show_help;
            exit 2
            ;;
    esac
done

# --- Locks -------------------------------------------------------
LOCK_FILE=/tmp/$SUBJECT.lock
if [ -f "$LOCK_FILE" ]; then
   echo "Script is already running"
   exit
fi

trap 'rm -f $LOCK_FILE' EXIT
touch $LOCK_FILE

# --- Body --------------------------------------------------------
#  SCRIPT LOGIC GOES HERE
if [ "$stage"  == '' ]; then
   echo "stage cannot be empty"
   exit
fi
if [ "$ssm_param" == '' ]; then
   echo "ssm_param cannot be empty"
   exit
fi
if [ "$secure_ssm_param" == '' ]; then
   echo "secure_ssm_param cannot be empty"
   exit
fi
aws ssm put-parameter --name "/$stage/infrastructure/api-report-smartspend/getFuSSMParam" --type "String" --value $ssm_param --overwrite --description "GET FU SSM Param"
aws ssm put-parameter --name "/$stage/infrastructure/api-report-smartspend/getFuSecureSSMParam" --type "SecureString" --value $secure_ssm_param --overwrite --description "GET FU Secure SSM Param"
