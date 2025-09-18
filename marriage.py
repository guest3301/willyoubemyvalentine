import os
import time
import subprocess

def ensure_pkg(pkg):
    result = subprocess.call(f"command -v {pkg} > /dev/null 2>&1", shell=True)
    if result != 0:
        print(f"Installing '{pkg}' package...")
        os.system(f"pkg install {pkg} -y")

def run_sl():
    ensure_pkg("sl")
    os.system("sl")

def run_cowsay(msg):
    ensure_pkg("cowsay")
    os.system(f"cowsay '{msg}'")
time.sleep(1)

run_sl()
time.sleep(1.5)
print("Hey there! Durgesh here")
mayuri = input("Mayuri, will you marry me? (yes/no): ").strip().lower()

if mayuri == "yes":
    words = ["yayyy!", "eurekaaaa!", "wooohooo!", "yaaasss!", "foreverrrr!"]
    for i, w in enumerate(words, start=1):
        run_cowsay(w)
        time.sleep(0.7)
    print("💍 Marriage confirmed! Yay!!!")
elif mayuri == "no":
    run_cowsay("Heart Error: 💔")
    print("Exiting gracefully with infinite sadness...")
else:
    run_cowsay("Undefined response detected...")
    print("Warning: Love still insists...")
    run_cowsay(">>> What we started must be completed ❤️")
