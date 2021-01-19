/** @format */

import startIdea from './idea.js';
import startCat from './category.js';
import startTag from './tag.js';
import startPage from './Oldpage.js';
import startMenu from './menu.js';
import Tag from './tag.js';
import Pag from './page.js';
import Category from './category.js';
import Menu from './menu.js';
import Calendar from './calendar.js';
import News from './news';
import Profile_image from './profile_image';
import NewsList from './newsList';
import EditPost from './editPost';
import AlbumEdit from './AlbumEdit.js';
import AlbumList from './albumList';
import Pagination from './pagination';

new Calendar('.calendar');
new News('startNewsAdmin');
new NewsList('startNweaList');
new EditPost('.editStart');
new Tag('tagStart');
new Category('catStart');
new Menu('.adminMenuStart');
new AlbumList('startAlbumLis');
new AlbumEdit('.containerAlbumEdit')
new Pag('pageStart');







