# 1) load packages and data
library(ISLR)
library(glmnet)
data(Hitters)
Hitters <- na.omit(Hitters)

# 2) make X and Y
idx <- which(colnames(Hitters) == "Salary")
X <- as.matrix(Hitters[, -idx])

Y <- as.numeric(Hitters$Salary)


lasso_model <- cv.glmnet(X,Y)

coef(lasso_model)

new_Y <- predict(lasso_model, X)

ssr <- sum(( Y - new_y)^2)

sst <- sum(( Y - mean(Y))^2)

r2 <- 1-ssr/sst 

print(r2)

resid <- Y - new_Y

plot(Hitters$Salary, resid)
abline(h=0, col = 'red')

