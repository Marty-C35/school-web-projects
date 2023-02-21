<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html" />

    <xsl:template match="main-window">
        <div class="{@class}">
            <header class="{header/@class}">
                <h2 class="{header/title/@class}">
                    <xsl:value-of select="header/title" />
                </h2>
            </header>
            <section class="{playlists/@class}">
                <xsl:apply-templates select="playlists/playlist-card" />
            </section>
            <section class="{podcasts/@class}">
                <h1>
                    <xsl:value-of select="podcasts/title" />
                </h1>
                <div class="{podcasts/podcast-list/@class}">
                    <xsl:apply-templates select="podcasts/podcast-list/podcast-card" />
                </div>
            </section>
        </div>
    </xsl:template>

    <xsl:template match="playlist-card">
        <div class="{@class}">
            <img class="{cover-image/@class}" src="{cover-image/@src}" alt="{cover-image/@alt}" />
            <div class="{controls/@class}">
                <span class="{controls/playlist-title/@class}">
                    <xsl:value-of select="controls/playlist-title" />
                </span>
                <button class="{controls/playlist-button/@class}">
                    <i class="{controls/playlist-button/icon/@class}" />
                </button>
            </div>
        </div>
    </xsl:template>

    <xsl:template match="podcast-card">
        <div class="{@class}">
            <img class="{cover-image/@class}" src="{cover-image/@src}" alt="{cover-image/@alt}" />
            <div class="{controls/@class}">
                <h2 class="{controls/podcast-title/@class}">
                    <xsl:value-of select="controls/podcast-title" />
                </h2>
                <span class="{controls/podcast-description/@class}">
                    <xsl:value-of select="controls/podcast-description" />
                </span>

            </div>
        </div>
    </xsl:template>

</xsl:stylesheet>