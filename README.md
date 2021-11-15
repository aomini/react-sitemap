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
 ### for styling the sitemap which is generated on the public folder of our React app, the react-sitemap.config.js file has a 
 ### optional parameter to define the XSLT styling format for the XML files, these files can have features like conditions, html-display, etc
 ### for showing the sitemap on a descriptive format.

### An example for the styling sitemap is given as :
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
				<style type="text/css">
					body {
						font-family: Helvetica, Arial, sans-serif;
						font-size: 13px;
						color: #545353;
					}
					#content {
						font-size: 0.9rem;
						text-align:center;
						margin: 0 auto;
						width:90%;
						max-width:1000px;
					}
					.expl {
						margin: 18px 3px;
						line-height: 1.2em;
					}
					.expl a {
						color: #206edb;
						font-weight: 600;
					}
					.expl a:visited {
						color: #206edb;
					}
					a {
						color: #000;
						text-decoration: none;
					}
					a:visited {
						color: #777;
					}
					a:hover {
						text-decoration: underline;
					}
					table {
						width:100%;
						text-align:left;
						border: none;
						border-collapse: collapse;
					}
					td {
						font-size: 0.8rem;
						
					}
					th {
						text-align:left;
						padding-right:30px;
						font-size: 0.8rem;
					}
					thead th {
						border-bottom: 1px solid #000;
					}
					#sitemap tr:nth-child(odd) td {
						background-color:#d6daf540;
					}
					#sitemap tbody tr:hover td {
						background-color: #d0d3ebbf;
						color:black;
					}
					#sitemap tbody tr:hover td, #sitemap tbody tr:hover td a {
						color:black;
					}
				</style>
			</head>
			<body>
			<div id="content">
				<h1>ExampirateXML Sitemap</h1>
				<p class="expl">
					You can find more information about Exampirate on <a href="http://exampirate.com" target="_blank" rel="noopener noreferrer">exampirate.com</a>.
				</p>
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


### An example for the styling urlset is given as :
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
			<style type="text/css">
				body {
					font-family: Helvetica, Arial, sans-serif;
					font-size: 13px;
					color: #545353;
				}
				#content {
                    font-size: 0.9rem;
                    text-align:center;
					margin: 0 auto;
                    width:90%;
                    max-width:1000px;
				}
				.expl {
					margin: 18px 3px;
					line-height: 1.2em;
				}
				.expl a {
					color: #206edb;
					font-weight: 600;
				}
				.expl a:visited {
					color: #206edb;
				}
				a {
					color: #000;
					text-decoration: none;
				}
				a:visited {
					color: #777;
				}
				a:hover {
					text-decoration: underline;
				}
                table {
                    width:100%;
                    text-align:left;
					border: none;
					border-collapse: collapse;
				}
				td {
					font-size: 0.8rem;
                    
				}
				th {
					text-align:left;
					padding-right:30px;
					font-size: 0.8rem;
				}
				thead th {
					border-bottom: 1px solid #000;
				}
                #sitemap tr:nth-child(odd) td {
					background-color:#d6daf540;
				}
				#sitemap tbody tr:hover td {
					background-color: #d0d3ebbf;
					color:black;
				}
				#sitemap tbody tr:hover td, #sitemap tbody tr:hover td a {
                    color:black;
				}
			</style>
		</head>
		<body>
		<div id="content">
			<h1>ExampirateXML Sitemap</h1>
			<p class="expl">
				You can find more information about Exampirate on <a href="http://exampirate.com" target="_blank" rel="noopener noreferrer">exampirate.com</a>.
			</p>
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
