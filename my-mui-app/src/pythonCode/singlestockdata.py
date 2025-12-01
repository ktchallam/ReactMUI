import nselib
import pandas as pd
from nselib import capital_market

data = capital_market.price_volume_and_deliverable_position_data(symbol='NATCOPHARM', from_date='01-11-2025', to_date='28-11-2025')

df=pd.DataFrame(data)

# df_filtercols = ['tradingDate', 'weekDay', 'description']
# df = df[df_filtercols]
# columnnames =df.columns.tolist()
# print(columnnames)

df_filtercols = ['Symbol','Date', 'PrevClose', 'TotalTradedQuantity', 'No.ofTrades', 
                 'DeliverableQty', '%DlyQttoTradedQty']
df = df[df_filtercols]

print(df)
