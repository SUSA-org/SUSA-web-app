f = open("costarica.csv", "r")
w = open("costarica_converted.csv", "w")
for line in f:
	arr = line.replace("\"","").split(",")
	print(arr)
	if (len(arr) >= 2):
		w.write(str(arr[1]) + "," + str(arr[2]))
w.close()