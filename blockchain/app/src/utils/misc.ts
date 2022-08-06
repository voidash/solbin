export function imageBasedOnType(type: string) {
  let imageCollection = {
    "Paper" : "https://images.immediate.co.uk/production/volatile/sites/4/2009/07/GettyImages-88623894-29b7fe8.jpg?quality=90&resize=768,574",
    "Metal" : "https://previews.123rf.com/images/jumbi/jumbi1505/jumbi150500007/39706719-pile-of-metal-scrap-background.jpg",
    "Plastics": "https://i2.wp.com/www.yesmagazine.org/wp-content/uploads/2021/05/98-plastic-roundup.jpg?fit=1400%2C840&quality=90&ssl=1",
    "Waste Food": "https://upload.wikimedia.org/wikipedia/commons/4/47/Trashed_vegetables_in_Luxembourg.jpeg",
    "Bottles": "https://d.newsweek.com/en/full/1975644/empty-glass-bottles-are-pictured.jpg?w=1600&h=1200&q=88&f=4f4ffdc55a2dcf723b27bade3f5a7e19"
  }
  if (type in imageCollection) {
    return imageCollection[type];
  }
    return imageCollection["Bottles"];
}