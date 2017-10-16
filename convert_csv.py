f = open("Korea_Fertility.csv", "r")
w = open("Korea_Fertility_converted.csv", "w")
for line in f:
	arr = line.replace("\"","").split(",")
	print(arr)
	if (len(arr) >= 2):
		#print(arr[1], arr[2])
		w.write(str(arr[1]) + "," + str(arr[2]))
w.close()