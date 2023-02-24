
#!/bin/bash
node addFirstData.js
node addLocations.js
node addReporter.js
# Add 3M reports
for i in {1..31}
do
   node addReports.js
done