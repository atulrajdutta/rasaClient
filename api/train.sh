#!/bin/sh

cd /home/adutta/rasa_practice
conda init bash
conda activate rasa_env
rasa train
