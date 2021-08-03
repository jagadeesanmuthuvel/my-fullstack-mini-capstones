import random, gzip, StringIO, threading, urllib2, re, getpass
from locust import HttpLocust, TaskSet, task, web
from random import randint
from urlparse import urlparse

#resource.setrlimit(resource.RLIMIT_NOFILE, (999999, 999999))
USER_AGENTS = [
    "Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19 (LocustIO)",
    "Android 4.0.3;AppleWebKit/534.30;Build/IML74K;GT-I9220 Build/IML74K (LocustIO)",
    "KWC-S4000/ UP.Browser/7.2.6.1.794 (GUI) MMP/2.0 (LocustIO)",
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html) (LocustIO)",
    "Googlebot-Image/1.0 (LocustIO)",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0 (LocustIO)",
    "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52 (LocustIO)",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36",
]


PW = getpass.getpass(' Enter Password:')

class UserBehavior(TaskSet):

    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        self.headers = {"User-Agent":USER_AGENTS[random.randint(0,len(USER_AGENTS)-1)]}
        self.client.headers = self.headers

    # 100 Max
    @task(100)
    def action_landing_page(self):
        self.client.get("/", auth=("username", PW))



class WebsiteUser(HttpLocust):

    host="https://www.example.com"
    task_set = UserBehavior
    min_wait=1000 
    max_wait=3000
