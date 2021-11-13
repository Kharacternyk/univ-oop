<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html" doctype-system="about:legacy-compat"/>
    <xsl:template match="library">
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
        />
        <div class="ui input">
            <input id="search" type="text" placeholder="Пошук…"/>
        </div>
        <table class="ui celled table unstackable">
            <thead>
                <tr>
                    <th scope="col" colspan="3">Книги</th>
                </tr>
                <tr>
                    <th scope="col">Назва</th>
                    <th scope="col">Автор</th>
                    <th scope="col">Теми</th>
                </tr>
            </thead>
            <xsl:for-each select="books/book">
                <tr>
                    <xsl:attribute name="id"><xsl:value-of select="id"/></xsl:attribute>
                    <td><xsl:value-of select="title"/></td>
                    <td><xsl:value-of select="author"/></td>
                    <td>
                        <xsl:for-each select="tags/tag">
                            <div class="ui blue label"><xsl:value-of select="."/></div>
                        </xsl:for-each>
                    </td>
                </tr>
            </xsl:for-each>
        </table>
        <table class="ui celled table unstackable">
            <thead>
                <tr>
                    <th scope="col" colspan="3">Читачі</th>
                </tr>
                <tr>
                    <th scope="col">Ім'я</th>
                    <th scope="col">Факультет</th>
                    <th scope="col">Посада</th>
                </tr>
            </thead>
            <xsl:for-each select="readers/reader">
                <tr>
                    <xsl:attribute name="id"><xsl:value-of select="id"/></xsl:attribute>
                    <td><xsl:value-of select="name"/></td>
                    <td><xsl:value-of select="faculty"/></td>
                    <td><xsl:value-of select="position"/></td>
                </tr>
            </xsl:for-each>
        </table>
        <script src="../script.js"></script>
    </xsl:template>
</xsl:stylesheet>
