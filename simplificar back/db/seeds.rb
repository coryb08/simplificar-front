# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
cory = User.create(name: "Cory")
fabiano = User.create(name: "Fabiano")
mickey = User.create(name: "Mickey Mouse")

temp1 = Template.new(name: "temp1")
temp2 = Template.new(name: "temp2")
temp3 = Template.new(name: "temp3")

cory.templates << temp1
cory.templates << temp2
fabiano.templates << temp3
