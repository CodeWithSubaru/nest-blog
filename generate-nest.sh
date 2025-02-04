#!/bin/bash
npx nest g module $1
npx nest g controller $1
npx nest g service $1