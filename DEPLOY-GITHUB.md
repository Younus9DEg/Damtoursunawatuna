# Deploy Dam Tours to GitHub Pages

## 🚀 Quick Deployment Steps

### 1. Create GitHub Repository
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit - Dam Tours Unawatuna website"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/damtours.git
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repo: `https://github.com/YOUR-USERNAME/damtours`
2. Click **Settings** → **Pages**
3. Under **Source**, select: `main` branch, `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes for deployment

### 3. Add Custom Domain (damtoursunawatuna.com)

**In GitHub:**
1. Settings → Pages → Custom domain
2. Enter: `damtoursunawatuna.com`
3. Click **Save**
4. Check **Enforce HTTPS** (after DNS propagates)

**In Your Domain Registrar:**
Add these DNS records:

**A Records (for root domain):**
```
Type: A
Name: @
Value: 185.199.108.153

Type: A  
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

**CNAME Record (for www):**
```
Type: CNAME
Name: www
Value: YOUR-USERNAME.github.io
```

### 4. Verify Deployment
- GitHub Pages URL: `https://YOUR-USERNAME.github.io/damtours/`
- Custom domain: `https://damtoursunawatuna.com/`
- Bike page: `https://damtoursunawatuna.com/bike.html`

## ✅ Post-Deployment Checklist

- [ ] Website loads on custom domain
- [ ] HTTPS is enforced
- [ ] All pages working (index.html, bike.html)
- [ ] Images loading correctly
- [ ] Mobile view working
- [ ] Google Translate working
- [ ] WhatsApp buttons working
- [ ] Booking modals working

## 📊 Submit to Search Engines

### Google Search Console:
1. Go to: https://search.google.com/search-console
2. Add property: `damtoursunawatuna.com`
3. Verify via DNS or HTML file
4. Submit sitemap: `https://damtoursunawatuna.com/sitemap.xml`
5. Request indexing for homepage

### Bing Webmaster Tools:
1. Go to: https://www.bing.com/webmasters
2. Add site: `damtoursunawatuna.com`
3. Submit sitemap: `https://damtoursunawatuna.com/sitemap.xml`

## 🔄 Update Website (Future Changes)

```bash
# Make your changes to files
# Then:
git add .
git commit -m "Description of changes"
git push

# GitHub Pages auto-deploys in 1-2 minutes!
```

## 📈 Expected Timeline

- **Day 1**: Site live on GitHub Pages
- **Day 2-3**: Domain DNS propagates
- **Week 1**: Google indexes your site
- **Week 2-4**: Start appearing in search results
- **Month 2-3**: Ranking improves (page 2-3)
- **Month 4-6**: Target #1 ranking with reviews & backlinks

## 💡 Pro Tips

1. **Enable HTTPS** - Required for security & SEO
2. **Keep sitemap updated** when adding new pages
3. **Monitor Google Search Console** weekly
4. **Get reviews** on Google My Business (critical for ranking)
5. **Build backlinks** from TripAdvisor, travel blogs
6. **Update content** monthly for better SEO

## ❓ Troubleshooting

**Domain not working?**
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Clear browser cache

**HTTPS not working?**
- Wait for DNS to propagate first
- Then enable "Enforce HTTPS" in GitHub settings

**Images not loading?**
- Check all image paths are relative (no leading /)
- Verify image files are in the repo

## 🎉 You're All Set!

Your website will be live at:
- https://damtoursunawatuna.com/
- https://damtoursunawatuna.com/bike.html

The `.html` extension is perfectly fine for SEO and normal for static sites!
