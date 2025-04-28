
# this R code is the solution to the fake HW without 
# explanations 
# Create this first before moving to an R Markdown file


setwd("~/Dropbox/Home/Teaching/AMS398/Lectures/Lecture04")

# read data and create RNATest subset for Boulder w/o NAs
covid <-
  read.csv(file = "CDPHE_COVID19_Wastewater_Dashboard_Data.csv", header = T)
boulder_covid <- covid[covid$Utility == "Boulder", ]
RNATest<- na.omit( boulder_covid$SARS_CoV_2_copies_L )

# find the statisics
mean( RNATest)
median(RNATest)

# plot histogram 
hist( RNATest, nclass=10, 
        xlab="SARS/COVID copies", main="")
# don't make a title here 
xline(  mean(  RNATest), col="blue",    lwd=4)
xline(  median(RNATest), col="magenta", lwd=4)
title("Boulder utility WW measurements \
 median (magenta)  mean (blue)")





