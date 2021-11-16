## config file example:

```js
module.exports = {
  /** Name of the domain */
  siteUrl: "https://example.com",

  /** Api url from which data is to be fetched */
  apiUrl: "https://api.example.com/v1/",

  /** Static pages (non-dynamic-routes) */
  nonDynamicPages: ["vendors", "/", "about-us"],

  /** Dynamic routes/ slug/ pages */
  siteMaps: [
    {
      url: "/vendor/list", // api endpoint
      path: "/vendors/[slug]", // path of the slugs generated from this endpoint
      name: "vendors", // name of the xml file, vendors.xml/ vendors-1.xml is created
    },
    // {
    //   url: "/question/list-slug",
    //   name: "questions",
    // },
  ],

  /** optional stylesheet using XSLT*/
  sitemapStylesheet: "xml/sitemap.xsl",
  urlsetStylesheet: "xml/urlset.xsl",
};
```

## Styling your sitemap and urlset XML files:
For styling of the generated sitemap, the xslt file are used to give a template structure to the sitemap or urlset generated.

### Step 1: create a xslt file for sitemap and urlset files.

In order to create a xslt file, we make a .xsl file on our public folder location.
These file gives a structure to the sitemap and urlset files that are generated.
Sitemap and urlset should have different xsl file because the structure of the sitemap and 
urlset are different.

#### Creating XSLT file for sitemap:
Create a file named sitemap.xsl on public folder.
```
<?xml version="1.0" encoding="UTF-8"?>
	<xsl:stylesheet version="2.0"
		xmlns:html="http://www.w3.org/TR/REC-html40"
		xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
		xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
		<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
		<xsl:template match="/">
			<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>Exampirate XML Sitemap</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			</head>
			<body>
			<div id="content">
				<h1>XML Sitemap</h1>
				
				<xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
					<p class="expl">
						This XML Sitemap Index file contains <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> sitemaps.
					</p>
					<table id="sitemap" cellpadding="3">
						<thead>
						<tr>
							<th width="75%">Sitemap</th>
							<th width="25%">Last Modified</th>
						</tr>
						</thead>
						<tbody>
						<xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
							<xsl:variable name="sitemapURL">
								<xsl:value-of select="sitemap:loc"/>
							</xsl:variable>
							<tr>
								<td>
									<a href="{$sitemapURL}"><xsl:value-of select="sitemap:loc"/></a>
								</td>
								<td>
									<xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
								</td>
							</tr>
						</xsl:for-each>
						</tbody>
					</table>
				</xsl:if>
				<xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &lt; 1">
					<p class="expl">
						This XML Sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.
					</p>
					<table id="sitemap" cellpadding="3">
						<thead>
						<tr>
							<th width="80%">URL</th>
							<th width="5%">Images</th>
							<th title="Last Modification Time" width="15%">Last Mod.</th>
						</tr>
						</thead>
						<tbody>
						<xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'"/>
						<xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
						<xsl:for-each select="sitemap:urlset/sitemap:url">
							<tr>
								<td>
									<xsl:variable name="itemURL">
										<xsl:value-of select="sitemap:loc"/>
									</xsl:variable>
									<a href="{$itemURL}">
										<xsl:value-of select="sitemap:loc"/>
									</a>
								</td>
								<td>
									<xsl:value-of select="count(image:image)"/>
								</td>
								<td>
									<xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
								</td>
							</tr>
						</xsl:for-each>
						</tbody>
					</table>
				</xsl:if>
			</div>
			</body>
			</html>
		</xsl:template>
	</xsl:stylesheet>

```

#### Creating XSLT file for sitemap:
Create a file named sitemap.xsl on public folder.

```
<?xml version="1.0" encoding="UTF-8"?>
	<xsl:stylesheet version="2.0"
		xmlns:html="http://www.w3.org/TR/REC-html40"
		xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
		xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<title>XML Sitemap</title>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		</head>
		<body>
		<div id="content">
			<h1>XML urlset</h1>
			
			<xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
				<p class="expl">
					This XML Sitemap Index file contains <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> sitemaps.
				</p>
				<table id="sitemap" cellpadding="3">
					<thead>
					<tr>
						<th width="75%">Sitemap</th>
						<th width="25%">Last Modified</th>
					</tr>
					</thead>
					<tbody>
					<xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
						<xsl:variable name="sitemapURL">
							<xsl:value-of select="sitemap:loc"/>
						</xsl:variable>
						<tr>
							<td>
								<a href="{$sitemapURL}"><xsl:value-of select="sitemap:loc"/></a>
							</td>
							<td>
								<xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
							</td>
						</tr>
					</xsl:for-each>
					</tbody>
				</table>
			</xsl:if>
			<xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &lt; 1">
				<p class="expl">
					This XML Sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.
				</p>
				<table id="sitemap" cellpadding="3">
					<thead>
					<tr>
						<th width="80%">URL</th>
						
						<th title="Last Modification Time" width="15%">Last Mod.</th>
					</tr>
					</thead>
					<tbody>
					<xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'"/>
					<xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
					<xsl:for-each select="sitemap:urlset/sitemap:url">
						<tr>
							<td>
								<xsl:variable name="itemURL">
									<xsl:value-of select="sitemap:loc"/>
								</xsl:variable>
								<a href="{$itemURL}">
									<xsl:value-of select="sitemap:loc"/>
								</a>
							</td>
							
							<td>
								<xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
							</td>
						</tr>
					</xsl:for-each>
					</tbody>
				</table>
			</xsl:if>
		</div>
		</body>
		</html>
	</xsl:template>
	</xsl:stylesheet>

```

### Step 2: Linking XSLT Files on the generated sitemaps and urlset.

The created files are the stylesheet for an HTML file, which need to be linked to the genereted sitemap and urlset.
For this, **react-sitemap** offers the option to link the file to the generated sitemaps (on the public folder) on the **react-sitemap.config.js** file.

### For linking a sitemap file xsl, on the config file we have optional parameter as : 

```
{  
	...
	sitemapStylesheet: "path-to-sitemap.xsl",
}

```

### For linking a urlset file xsl, on the config file we have optional parameter as : 

```
{ 
	...
	 urlsetStylesheet: "path-to-urlset.xsl",
}

```




