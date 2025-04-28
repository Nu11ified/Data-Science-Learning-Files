#[Hadley Wickham and  Lisa Stryjewski's paper on boxplots ](https://vita.had.co.nz/papers/boxplots.pdf)


df <- read.csv('dat/classProfiles.csv')

# THE OG BOXPLOT
boxplot(df)

# THE VERSION WITH THE NICE LOOKING LABELS
# FROM: https://www.tenderisthebyte.com/blog/2019/04/25/rotating-axis-labels-in-r/
par(mar = c(6.1, 4.1, 4.1, 4.1), # change the margins
    lwd = 2, # increase the line thickness
    cex.axis = 1.2 # increase default axis label size
    )

boxplot(df, xaxt = "n", yaxt = "n")

## Draw x-axis without labels.
axis(side = 1, labels = FALSE)

## Draw y-axis.
axis(side = 2,
     ## Rotate labels perpendicular to y-axis.
     las = 2,
     ## Adjust y-axis label positions.
     mgp = c(3, 0.75, 0))

## Draw the x-axis labels.
text(x = 1:length(df),
     ## Move labels to just below bottom of chart.
     y = par("usr")[3] - 0.45,
     ## Use names from the data list.
     labels = names(df),
     ## Change the clipping region.
     xpd = NA,
     ## Rotate the labels by 35 degrees.
     srt = 35,
     ## Adjust the labels to almost 100% right-justified.
     adj = 0.965,
     ## Increase label size.
     cex = 1.2)

# THE VERSION WITH POINTS

boxplot(df,col = "white")
# Points
stripchart(df,              # Data
           method = "jitter", # Random noise
           pch = 19,          # Pch symbols
           col = 4,           # Color of the symbol
           vertical = TRUE,   # Vertical mode
           add = TRUE)        # Add it over

