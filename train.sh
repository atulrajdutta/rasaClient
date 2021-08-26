#!/bin/sh

cd /home/adutta/rasa_chatbot/gis_chatbot/
conda init bash
conda activate rasa_env
rasa train
