dbfile="xunga.db"
echo '' | sqlite3 -cmd ".read output/areas_atuacao_proponente.sql" $dbfile
echo '' | sqlite3 -cmd ".read output/esferas_administrativas.sql" $dbfile
echo '' | sqlite3 -cmd ".read output/especies_empenho.sql" $dbfile
echo '' | sqlite3 -cmd ".read output/habilitacoes_area_atuacao.sql" $dbfile
echo '' | sqlite3 -cmd ".read output/modalidades.sql" $dbfile
echo '' | sqlite3 -cmd ".read output/municipios.sql" $dbfile
echo '' | sqlite3 -cmd ".read output/naturezas_juridicas.sql" $dbfile
echo '' | sqlite3 -cmd ".read output/orgaos.sql" $dbfile
echo '' | sqlite3 -cmd ".read output/proponentes.sql" $dbfile
echo '' | sqlite3 -cmd ".read output/situacoes_convenios.sql" $dbfile
echo '' | sqlite3 -cmd ".read output/situacoes_propostas.sql" $dbfile
echo '' | sqlite3 -cmd ".read output/situacoes_publicacao_convenio.sql" $dbfile
echo '' | sqlite3 -cmd ".read output/subareas_atuacao_proponente.sql" $dbfile
echo '' | sqlite3 -cmd ".read output/subsituacoes_convenios.sql.sql" $dbfile

sqlite3 -cmd ".tables" $dbfile
