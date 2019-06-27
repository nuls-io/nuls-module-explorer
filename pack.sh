#!/bin/bash
cd `dirname %0`
npm run build
rm -rf ../data
mv dist ../data