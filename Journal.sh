# git/github
rm -rf .git
git init
git branch -M main
git add .
git commit -m "first commit"
gh repo create lekeistheculture --public
git remote add origin https://github.com/JXPM/lekeistheculture.git
git push --set-upstream origin main

# Supprimer le fichier .env du suivi git
git rm --cached .env
rm '.env'

#create .gitignore
touch backend/.gitignore

#fichier Maj et push
git status
git add .
git commit -m "ajout de la responsivité"
git push origin main


#test du backend en local
cd backend
python3 scr/app.py
