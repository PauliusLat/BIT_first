/** @format */

import startIdea from './idea.js';
// import startGallery from './gallery.js';
import startCat from './category.js';
import startTag from './tag.js';
import startPage from './page.js';
import startMenu from './menu.js';
import Tag from './tag.js';
import Menu from './menu.js';
import Calendar from './calendar.js';
// import TextEditor from './text-editor.js'
import News from './news';
import Profile_image from './profile_image';
import NewsList from './newsList';
import EditPost from './editPost';
import lightbox from './light_box';

// new TextEditor('.news-container')
new Calendar('.calendar');
new News('startNewsAdmin');
new NewsList('startNweaList');
new EditPost('.editStart');
new Tag('tagStart');
new Menu('.adminMenuStart');






