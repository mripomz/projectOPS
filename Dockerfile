FROM quantumobject/docker-cakephp
MAINTAINER Anurak Chatree <anurak@lannasoftworks.com>

RUN rm -rf /var/www/*
#AVIA code
COPY . /var/www	
RUN chown -R www-data:www-data /var/www/app/tmp/
RUN chmod -R 777 /var/www/app/tmp/

EXPOSE 80