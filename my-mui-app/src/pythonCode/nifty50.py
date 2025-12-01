import requests
import pandas as pd
from datetime import datetime
import time

def get_nifty50_stocks():
    """
    Fetch NSE Nifty 50 stock details using NSE India API
    """
    
    # Headers to mimic browser request
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    
    session = requests.Session()
    session.headers.update(headers)
    
    try:
        # Get cookies by visiting NSE homepage first
        session.get('https://www.nseindia.com', timeout=10)
        time.sleep(1)
        
        # Fetch Nifty 50 data
        url = 'https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050'
        response = session.get(url, timeout=10)
        response.raise_for_status()
        
        data = response.json()
        stocks = data['data']
        
        print("=" * 100)
        print(f"NSE NIFTY 50 STOCKS - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 100)
        
        stock_list = []
        
        for stock in stocks:
            if stock['symbol'] != 'NIFTY 50':  # Skip index entry
                stock_info = {
                    'Symbol': stock.get('symbol', 'N/A'),
                    'Company': stock.get('meta', {}).get('companyName', 'N/A') if 'meta' in stock else 'N/A',
                    'Open': stock.get('open', 0),
                    'High': stock.get('dayHigh', 0),
                    'Low': stock.get('dayLow', 0),
                    'LTP': stock.get('lastPrice', 0),
                    'Prev_Close': stock.get('previousClose', 0),
                    'Change': stock.get('change', 0),
                    'Pct_Change': stock.get('pChange', 0),
                    'Volume': stock.get('totalTradedVolume', 0),
                    'Value_Cr': round(stock.get('totalTradedValue', 0) / 10000000, 2),
                    '52W_High': stock.get('yearHigh', 0),
                    '52W_Low': stock.get('yearLow', 0),
                }
                stock_list.append(stock_info)
        
        # Create DataFrame
        df = pd.DataFrame(stock_list)
        
        # Sort by market cap (using traded value as proxy)
        df = df.sort_values('Value_Cr', ascending=False).reset_index(drop=True)
        
        # Display data
        print(f"\nTotal Stocks: {len(df)}\n")
        pd.set_option('display.max_columns', None)
        pd.set_option('display.width', None)
        pd.set_option('display.max_rows', None)
        print(df.to_string(index=True))
        
        # Statistics
        print("\n" + "=" * 100)
        print("MARKET STATISTICS")
        print("=" * 100)
        gainers = len(df[df['Pct_Change'] > 0])
        losers = len(df[df['Pct_Change'] < 0])
        unchanged = len(df[df['Pct_Change'] == 0])
        
        print(f"Gainers: {gainers} ({gainers/len(df)*100:.1f}%)")
        print(f"Losers: {losers} ({losers/len(df)*100:.1f}%)")
        print(f"Unchanged: {unchanged}")
        print(f"\nAverage Change: {df['Pct_Change'].mean():.2f}%")
        print(f"Top Gainer: {df.loc[df['Pct_Change'].idxmax(), 'Symbol']} ({df['Pct_Change'].max():.2f}%)")
        print(f"Top Loser: {df.loc[df['Pct_Change'].idxmin(), 'Symbol']} ({df['Pct_Change'].min():.2f}%)")
        
        # Save to CSV
        filename = f"nifty50_stocks_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        df.to_csv(filename, index=False)
        print(f"\n✓ Data saved to {filename}")
        
        return df
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {str(e)}")
        return None
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return None

if __name__ == "__main__":
    # Install required libraries:
    # pip install requests pandas
    
    print("Fetching NSE Nifty 50 stock data...\n")
    df = get_nifty50_stocks()
    
    if df is not None:
        print("\n✓ Successfully fetched stock data!")
    else:
        print("\n✗ Failed to fetch stock data.")