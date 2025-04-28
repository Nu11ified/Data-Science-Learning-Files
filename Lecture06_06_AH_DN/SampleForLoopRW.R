iris$Sepal.Length

mean(iris$Sepal.Length)
sd(iris$Sepal.Width)
median(iris$Sepal.Length)

quantile(iris$Sepal.Length, c(.01, .99))

mySpecies <- as.character(unique(iris$Species))

#i=1
mean_for_one_species <- mean(iris$Sepal.Length[which(iris$Species==mySpecies[1])])  

iris$Species == levels(iris$Species)[2]
mean_by_species <- NULL

for (i in 1:10){
  print(i)
}

for(i in 1:length(unique(iris$Species))){
  mean_by_species[i] <- mean(iris$Sepal.Length[which(iris$Species==mySpecies[i])])  
}

round(mean_by_species,2)


#Here's another way to do it with tapply
mean_by_hour <- tapply(ammonia, hour, mean)
plot(0:23, mean_by_hour, type="l", xlab="Hour", ylab="Hourly Mean")