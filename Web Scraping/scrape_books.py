import requests
from bs4 import BeautifulSoup
import pandas as pd

# Step 1: Get the webpage
url = "https://books.toscrape.com/"
response = requests.get(url)

# Step 2: Parse HTML
soup = BeautifulSoup(response.text, "html.parser")

# Step 3: Find all book containers
books = soup.find_all("article", class_="product_pod")

# Step 4: Create empty lists
titles = []
prices = []
availability = []

# Step 5: Extract data
for book in books:
    title = book.h3.a["title"]
    price = book.find("p", class_="price_color").text
    stock = book.find("p", class_="instock availability").text.strip()

    titles.append(title)
    prices.append(price)
    availability.append(stock)

# Step 6: Create DataFrame
df = pd.DataFrame({
    "Title": titles,
    "Price": prices,
    "Availability": availability
})
# Step 8: Data validation checks
print("Missing values in eachdocments:")
print(df.isnull().sum())

print("\nDuplicate rows:")
print(df.duplicated().sum())


# Step 7: Save dataset
df.to_csv("books_dataset.csv", index=False)

print("Dataset created successfully!")
