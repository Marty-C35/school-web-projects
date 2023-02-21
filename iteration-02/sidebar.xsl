<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html" />

    <xsl:template match="sidebar">
        <aside class="{@class}">
            <h1 class="{title/@class}">
                <xsl:value-of select="title" />
            </h1>
            <nav class="{navigation/@class}">
                <ul class="{navigation/main-list/@class}">
                    <xsl:apply-templates select="navigation/main-list/list-item" />
                </ul>
                <ul class="{navigation/library-list/@class}">
                    <xsl:apply-templates select="navigation/library-list/list-item" />
                </ul>
            </nav>
        </aside>
    </xsl:template>

    <xsl:template match="list-item[icon]">
        <li class="{@class}"> 
            <xsl:if test="@active='true'">
                <xsl:attribute name="class">nav__item nav__item--active</xsl:attribute>
            </xsl:if>
            <i class="{icon/@class}"></i>
            <span>
                <xsl:value-of select="title" />
            </span>
        </li>
    </xsl:template>

    <xsl:template match="list-item">
        <li class="{@class}"> 
            <span>
                <xsl:value-of select="title" />
            </span>
        </li>
    </xsl:template>

</xsl:stylesheet>