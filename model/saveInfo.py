import cgi

my_param = cgi.getfirst('value')

print "Content-Type: text/html\n"
print my_param

return my_param
