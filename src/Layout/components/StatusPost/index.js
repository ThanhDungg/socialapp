import classNames from 'classnames/bind';
import styles from './StatusPost.module.scss';
import HeaderStatus from '../../../components/HeaderStatus';
import BodyStatus from '../../../components/BodyStatus';
import FormReaction from '../../../components/FormReaction';
import TotalLike from '../../../components/TotalLike';
import Caption from '../../../components/Caption';
import InputCmt from '../../../components/InputCmt';
import Close from '../../../components/Close';
import { useContext } from 'react';
import { SocketContext } from '../../../App';
import ScrollToBottom from 'react-scroll-to-bottom';
import Comment from '../../../components/Comment';
import ChildrenCmt from '../../../components/ChildrenCmt';
import { postData } from '../../../config/fetchData';
import { postComment } from '../../../config/configs';

const cx = classNames.bind(styles);

function StatusPost({ status, setShowStatusPost, listComment, setListComment, user }) {
   const socket = useContext(SocketContext);
   console.log(listComment);

   const sendComment = async (id) => {
      try {
         const res = await postData(
            postComment + `${id}/none`,
            {
               content: document.getElementById(`comment-${id}`).value,
            },
            localStorage.getItem('accessToken'),
         );
         if (res.data.status == 1) {
            setListComment((list) => [
               ...list,
               {
                  COMMENTs: [],
                  CONTENT: document.getElementById(`comment-${id}`).value,
                  POST_ID: status.ID,
                  USER: user,
                  createdAt: new Date(),
               },
            ]);
            socket.emit('createComment', status);
            document.getElementById(`comment-${id}`).value = '';
         } else {
            alert('Comment fail');
         }
      } catch (e) {
         console.log(e);
      }
   };

   return (
      <div className={cx('wrapper')}>
         <Close
            onClick={() => {
               setShowStatusPost(false);
            }}
         />
         <div className={cx('body-status')}>
            <div className={cx('status')}>
               <HeaderStatus
                  avatar={status.USER.AVATAR}
                  fullname={status.USER.USERNAME}
                  caption={new Date(status.createdAt).toDateString()}
                  id={status.USER.ID}
               />
               <BodyStatus status={status} />
               <div>
                  <FormReaction socket={socket} post={status} />
               </div>
               <TotalLike Like={status.LIKES} id={status.ID} />
               <Caption name={status.USER.USERNAME} caption={status.CAPTION} />
            </div>
            <div className={cx('footer-status')}>
               <div className={cx('cmt-status')}>
                  <div className={cx('comment')}>
                     <ScrollToBottom className={cx('scroll')}>
                        <div className={cx('list-cmt')}>
                           {listComment.map((cmt) => {
                              return (
                                 <div>
                                    <Comment
                                       content={cmt.CONTENT}
                                       avatar={cmt.USER.AVATAR}
                                       username={cmt.USER.USERNAME}
                                       time={new Date(cmt.createdAt).toDateString()}
                                       idpost={status.ID}
                                       id={cmt.ID}
                                       idUser={cmt.USER.ID}
                                    />
                                    {cmt.COMMENTs.map((cmts) => {
                                       return (
                                          <ChildrenCmt
                                             content={cmts.CONTENT}
                                             avatar={cmts.USER.AVATAR}
                                             username={cmts.USER.USERNAME}
                                             time={new Date(cmts.createdAt).toDateString()}
                                             idUser={cmts.USER.ID}
                                          />
                                       );
                                    })}
                                 </div>
                              );
                           })}
                        </div>
                     </ScrollToBottom>
                  </div>
                  <div className={cx('input-cmt')}>
                     <InputCmt
                        onKeyPress={() => {
                           sendComment(status.ID);
                        }}
                        id={status.ID}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default StatusPost;
