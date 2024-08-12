import React from 'react'

function page() {
  return (
    <main id="site__main" class="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">

        <div class="max-w-3xl mx-auto">


            <div class="box relative rounded-lg shadow-md">

                <div class="flex md:gap-8 gap-4 items-center md:p-8 p-6 md:pb-4">


                    <div class="relative md:w-20 md:h-20 w-12 h-12 shrink-0"> 

                        <label for="file" class="cursor-pointer">
                            <img id="img" src="/images/avatars/avatar-3.jpg" class="object-cover w-full h-full rounded-full" alt=""/>
                            <input type="file" id="file" class="hidden" />
                        </label>
  
                        <label for="file" class="md:p-1 p-0.5 rounded-full bg-slate-600 md:border-4 border-white absolute -bottom-2 -right-2 cursor-pointer dark:border-slate-700">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="md:w-4 md:h-4 w-3 h-3 fill-white">
                                <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                                <path fill-rule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                            </svg>

                            <input id="file" type="file" class="hidden" />
        
                        </label>

                    </div>

                    <div class="flex-1">
                        <h3 class="md:text-xl text-base font-semibold text-black dark:text-white"> 이중재 </h3>
                    </div>


                </div>

                <div class="relative border-b" tabindex="-1" uk-slider="finite: true">

                    <nav class="uk-slider-container overflow-hidden nav__underline px-6 p-0 border-transparent -mb-px">
        
                        <ul class="uk-slider-items w-[calc(100%+10px)] !overflow-hidden" 
                            uk-switcher="connect: #setting_tab ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"> 
                            
                            <li class="w-auto pr-2.5"> <a href="#"> 주요정보 </a> </li>
                            <li class="w-auto pr-2.5"> <a href="#"> 내가쓴글</a> </li>
                            <li class="w-auto pr-2.5"> <a href="#"> Avatare</a> </li>
                            <li class="w-auto pr-2.5"> <a href="#"> Cover Photo</a> </li>
                            <li class="w-auto pr-2.5"> <a href="#"> Invites</a> </li>
                            <li class="w-auto pr-2.5"> <a href="#"> Finish</a> </li>  
                            <li class="w-auto pr-2.5"> <a href="#"> Description </a> </li>
                            <li class="w-auto pr-2.5"> <a href="#"> Setting</a> </li>  
                            <li class="w-auto pr-2.5"> <a href="#"> anothers</a> </li>  
                            <li class="w-auto pr-2.5"> <a href="#"> anothers</a> </li>  
                            <li class="w-auto pr-2.5"> <a href="#"> anothers44</a> </li>  
                            
                        </ul>
                    
                    </nav>
                            
                    <a class="absolute -translate-y-1/2 top-1/2 left-0 flex items-center w-20 h-full p-2 py-1 justify-start bg-gradient-to-r from-white via-white dark:from-slate-800 dark:via-slate-800" href="#" uk-slider-item="previous"> <ion-icon name="chevron-back" class="text-2xl ml-1"></ion-icon> </a>
                    <a class="absolute right-0 -translate-y-1/2 top-1/2 flex items-center w-20 h-full p-2 py-1 justify-end bg-gradient-to-l from-white via-white dark:from-slate-800 dark:via-slate-800" href="#" uk-slider-item="next">  <ion-icon name="chevron-forward" class="text-2xl mr-1"></ion-icon> </a>
            
                </div> 


                <div id="setting_tab" class="uk-switcher md:py-12 md:px-20 p-6 overflow-hidden text-black text-sm"> 
                    

                    <div>

                        <div>
                            
                            <div class="space-y-6">

                                <div class="md:flex items-center gap-10">
                                    <label class="md:w-32 text-right"> Username </label>
                                    <div class="flex-1 max-md:mt-4">
                                        <input type="text" placeholder="Monroe" class="lg:w-1/2 w-full"/>
                                    </div>
                                </div>
                                
                                <div class="md:flex items-center gap-10">
                                    <label class="md:w-32 text-right"> Email </label>
                                    <div class="flex-1 max-md:mt-4">
                                        <input type="text" placeholder="info@mydomain.com" class="w-full"/>
                                    </div>
                                </div> 
        
                                <div class="md:flex items-start gap-10">
                                    <label class="md:w-32 text-right"> Bio </label>
                                    <div class="flex-1 max-md:mt-4">
                                        <textarea class="w-full" rows="5" placeholder="Inter your Bio"></textarea>
                                    </div>
                                </div> 
    
                                <div class="md:flex items-center gap-10">
                                    <label class="md:w-32 text-right"> Gender </label>
                                    <div class="flex-1 max-md:mt-4">
                                        <select class="!border-0 !rounded-md lg:w-1/2 w-full">
                                            <option value="1">Male</option>
                                            <option value="2">Female</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="md:flex items-center gap-10">
                                    <label class="md:w-32 text-right"> Relationship </label>
                                    <div class="flex-1 max-md:mt-4">
                                        <select class="!border-0 !rounded-md lg:w-1/2 w-full">
                                            <option value="0">None</option>
                                            <option value="1"  >Single</option>
                                            <option value="2"  >In a relationship</option>
                                            <option value="3"  >Married</option>
                                            <option value="4"  >Engaged</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="md:flex items-start gap-10 " hidden>
                                    <label class="md:w-32 text-right"> Avatar </label>
                                    <div class="flex-1 flex items-center gap-5 max-md:mt-4">
                                        <img src="/images/avatars/avatar-3.jpg" alt="" class="w-10 h-10 rounded-full"/>
                                        <button type="submit" class="px-4 py-1 rounded-full bg-slate-100/60 border dark:bg-slate-700 dark:border-slate-600 dark:text-white"> Change</button>
                                    </div>
                                </div>

                            </div>
  
                            <div class="flex items-center gap-4 mt-16 lg:pl-[10.5rem]">
                                <button type="submit" class="button lg:px-6 bg-secondery max-md:flex-1"> Cancle</button>
                                <button type="submit" class="button lg:px-10 bg-primary text-white max-md:flex-1"> Save <span class="ripple-overlay"></span></button>
                            </div>
                            
                        </div> 

                    </div>

                    <div>

                        <div class="max-w-md mx-auto">

                            <div class="font-normal text-gray-400">
                            
                               

                                <div class="space-y-6 mt-8">

                                    <div class="flex items-center gap-3">
                                        <div class="bg-blue-50 rounded-full p-2 flex ">
                                            <ion-icon name="logo-facebook" class="text-2xl text-blue-600"></ion-icon> 
                                        </div>
                                        <div class="flex-1">
                                            <input type="text" class="w-full" placeholder="http://www.facebook.com/myname"/>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <div class="bg-pink-50 rounded-full p-2 flex ">
                                            <ion-icon name="logo-instagram" class="text-2xl text-pink-600"></ion-icon> 
                                        </div>
                                        <div class="flex-1">
                                            <input type="text" class="w-full" placeholder="http://www.instagram.com/myname"/>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <div class="bg-sky-50 rounded-full p-2 flex ">
                                            <ion-icon name="logo-twitter" class="text-2xl text-sky-600"></ion-icon> 
                                        </div>
                                        <div class="flex-1">
                                            <input type="text" class="w-full" placeholder="http://www.twitter.com/myname"/>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <div class="bg-red-50 rounded-full p-2 flex ">
                                            <ion-icon name="logo-youtube" class="text-2xl text-red-600"></ion-icon> 
                                        </div>
                                        <div class="flex-1">
                                            <input type="text" class="w-full" placeholder="http://www.youtube.com/myname"/>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <div class="bg-slate-50 rounded-full p-2 flex ">
                                            <ion-icon name="logo-github" class="text-2xl text-black"></ion-icon> 
                                        </div>
                                        <div class="flex-1">
                                            <input type="text" class="w-full" placeholder="http://www.github.com/myname"/>
                                        </div>
                                    </div>

                                </div> 
                               
                            </div> 
                            
                            <div class="flex items-center justify-center gap-4 mt-16">
                                <button type="submit" class="button lg:px-6 bg-secondery max-md:flex-1"> Cancle</button>
                                <button type="submit" class="button lg:px-10 bg-primary text-white max-md:flex-1"> Save</button>
                            </div>

                        </div>

                    </div>

                    <div>

                        <div>
                            
                            <div class="md:flex items-start gap-16">
                                <label class="md:w-32 text-right font-semibold">  Notify me when </label>
                                
                                <div class="flex-1 space-y-4 interactive-effect max-md:mt-5">
                                    
                                    <div>
                                        <label class="inline-flex items-center">
                                          <input class="rounded" type="checkbox" checked name="checkbox1" value="3" />
                                          <span class="ml-3"> Someone send me message </span>
                                        </label>
                                    </div>
                                    
                                    <div>
                                        <label class="inline-flex items-center">
                                          <input class="rounded" type="checkbox" checked name="checkbox1" value="3" />
                                          <span class="ml-3"> Someone liked my photo </span>
                                        </label>
                                    </div>
                                    
                                    <div>
                                        <label class="inline-flex items-center">
                                          <input class="rounded" type="checkbox" checked name="checkbox2" value="3" />
                                          <span class="ml-3"> Someone shared on my photo </span>
                                        </label>
                                    </div>

                                    <div>
                                        <label class="inline-flex items-center">
                                          <input class="rounded" type="checkbox" checked name="checkbox2" value="3" />
                                          <span class="ml-3">   Someone followed me </span>
                                        </label>
                                    </div>

                                    <div>
                                        <label class="inline-flex items-center">
                                          <input class="rounded" type="checkbox" checked name="checkbox2" value="3" />
                                          <span class="ml-3"> Someone liked my posts</span>
                                        </label>
                                    </div>
                                    
                                    <div>
                                        <label class="inline-flex items-center">
                                          <input class="rounded" type="checkbox" checked name="checkbox2" value="3" />
                                          <span class="ml-3"> Someone mentioned me</span>
                                        </label>
                                    </div>

                                    <div>
                                        <label class="inline-flex items-center">
                                          <input class="rounded" type="checkbox" checked name="checkbox2" value="3" />
                                          <span class="ml-3">   Someone sent me follow requset</span>
                                        </label>
                                    </div>
                                </div>

                            </div> 

                            <div class="flex items-center justify-center gap-4 mt-16">
                                <button type="submit" class="button lg:px-6 bg-secondery max-md:flex-1"> Cancle</button>
                                <button type="submit" class="button lg:px-10 bg-primary text-white max-md:flex-1"> Save</button>
                            </div>

                        </div>

                    </div> 

                    <div>

                        <div>

                            <div class="space-y-6">

                                <div class="md:flex items-start gap-10">

                                    <label class="w-40 text-right font-semibold"> Who can follow me ? </label>
                                    
                                    <div class="flex-1 space-y-2 interactive-effect max-md:mt-3">
                                        
                                        <div>
                                            <label class="inline-flex items-center">
                                              <input type="radio" name="radio-s1" checked value="1" />
                                              <span class="ml-3"> Everyone</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label class="inline-flex items-center">
                                              <input type="radio" name="radio-s1" value="2" />
                                              <span class="ml-3"> The People I Follow</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label class="inline-flex items-center">
                                              <input type="radio" name="radio-s1" value="3" />
                                              <span class="ml-3"> No body</span>
                                            </label>
                                        </div>
        
                                    </div>
    
                                </div> 

                                <div class="md:flex items-start gap-10">

                                    <label class="md:w-40 text-right font-semibold"> Who can message me ? </label>
                                    
                                    <div class="flex-1 space-y-2 interactive-effect max-md:mt-3">
                                         
                                        <div>
                                            <label class="inline-flex items-center">
                                              <input type="radio" name="radio-s2" checked value="1" />
                                              <span class="ml-3"> Everyone</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label class="inline-flex items-center">
                                              <input type="radio" name="radio-s2" value="2" />
                                              <span class="ml-3"> The People I Follow</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label class="inline-flex items-center">
                                              <input type="radio" name="radio-s2" value="3" />
                                              <span class="ml-3"> No body</span>
                                            </label>
                                        </div>
        
                                    </div>
    
                                </div> 

                                <div class="md:flex items-start gap-10">
                                    
                                    <label class="md:w-40 text-right font-semibold">Status</label>
                                    
                                    <div class="flex-1 space-y-2 interactive-effect max-md:mt-3">
                                         
                                        <div>
                                            <label class="inline-flex items-center">
                                              <input type="radio" name="radio-s3" checked value="3" />
                                              <span class="ml-3"> Yes</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label class="inline-flex items-center">
                                              <input type="radio" name="radio-s3" value="3" />
                                              <span class="ml-3"> No</span>
                                            </label>
                                        </div>

                                    </div>
    
                                </div> 
                                <div class="md:flex items-start gap-10">
                                    
                                    <label class="md:w-40 text-right font-semibold">Show my activities ?</label>
                                    
                                    <div class="flex-1 space-y-2 interactive-effect max-md:mt-3">
                                         
                                        <div>
                                            <label class="inline-flex items-center">
                                              <input type="radio" name="radio-s4" checked value="3" />
                                              <span class="ml-3"> Public</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label class="inline-flex items-center">
                                              <input type="radio" name="radio-s4" value="3" />
                                              <span class="ml-3"> Hide</span>
                                            </label>
                                        </div>

                                    </div>
    
                                </div> 
 
                            </div>

                            <div class="flex items-center justify-center gap-4 mt-16">
                                <button type="submit" class="button lg:px-6 bg-secondery max-md:flex-1"> Cancle</button>
                                <button type="submit" class="button lg:px-10 bg-primary text-white max-md:flex-1"> Save</button>
                            </div>

                        </div>

                    </div> 

                    <div>

                        <div>
                            
                            <div class="space-y-6 max-w-lg mx-auto font-medium">

                                <div class="md:flex items-center gap-16 justify-between">
                                    <label class="md:w-40 text-right"> Who can follow me ? </label>
                                    <div class="flex-1 max-md:mt-4">
                                        <select class="w-full !border-0 !rounded-md">
                                            <option value="1">Everyone</option>
                                            <option value="2">People I Follow</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="md:flex items-center gap-16 justify-between">
                                    <label class="md:w-40 text-right"> Who can message me ? </label>
                                    <div class="flex-1 max-md:mt-4">
                                        <select class="w-full !border-0 !rounded-md">
                                            <option value="1">Everyone</option>
                                            <option value="2">People I Follow</option>
                                            <option value="2">No body</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="md:flex items-center gap-16 justify-between">
                                    <label class="md:w-40 text-right"> Show my activities ?</label>
                                    <div class="flex-1 max-md:mt-4">
                                        <select class="w-full !border-0 !rounded-md">
                                            <option value="1">Yes</option>
                                            <option value="2">Now</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="md:flex items-center gap-16 justify-between">
                                    <label class="md:w-40 text-right"> Status </label>
                                    <div class="flex-1 max-md:mt-4">
                                        <select class="w-full !border-0 !rounded-md">
                                            <option value="1">Online</option>
                                            <option value="2">Offline</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="md:flex items-center gap-16 justify-between">
                                    <label class="md:w-40 text-right"> Who can see my tags? </label>
                                    <div class="flex-1 max-md:mt-4">
                                        <select class="w-full !border-0 !rounded-md">
                                            <option value="1">Everyone</option>
                                            <option value="2">People I Follow</option>
                                            <option value="2">No body</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="md:flex items-center gap-16 justify-between">
                                    <label class="md:w-40 text-right"> Allow search engines </label>
                                    <div class="flex-1 max-md:mt-4">
                                        <select class="w-full !border-0 !rounded-md">
                                            <option value="1">Yes</option>
                                            <option value="2">Now</option>
                                        </select>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div class="flex items-center justify-center gap-4 mt-16">
                                <button type="submit" class="button lg:px-6 bg-secondery max-md:flex-1"> Cancle</button>
                                <button type="submit" class="button lg:px-10 bg-primary text-white max-md:flex-1"> Save</button>
                            </div>

                        </div>
                        
                    </div>
                    
                    <div>

                        <div>

                            <div class="max-w-lg mx-auto font-normal text-gray-400 text-sm">
                                
                                <div>
                                    <h4 class="text-lg font-semibold text-black dark:text-white"> Alerts preferences </h4>
                                    <p class=" mt-3">We may still send you important notifications about your account and content outside of you preferred notivications settings</p>
                                </div>

                                <div class="mt-8 md:space-y-8 space-y-4" uk-scrollspy="target: > div; cls: uk-animation-slide-bottom-medium; delay: 100 ;repeat: true">

                                    <div class="w-full">
                                        <label class="switch flex justify-between items-center cursor-pointer gap-4">
                                            <div class="bg-sky-100 text-sky-500 rounded-full p-2 md:flex hidden shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                                </svg> 
                                            </div>
                                            <div class="flex-1 md:pr-8">
                                                <h4 class="text-base font-medium mb-1.5 text-black dark:text-white"> Email notifications</h4>
                                                <p class=""> You can receive notifications about important updates and content directly to your email inbox. </p>
                                            </div>
                                            
                                            <input type="checkbox" checked/><span class="switch-button !relative"></span> 
                                        </label>
                                    </div>

                                    <div class="w-full">
                                        <label class="switch flex justify-between items-center cursor-pointer gap-4">
                                            <div class="bg-purple-100 text-purple-500 rounded-full p-2 md:flex hidden shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
                                                </svg>
                                            </div>
                                            <div class="flex-1 md:pr-8">
                                                <h4 class="text-base font-medium mb-1.5 text-black dark:text-white"> web notifications</h4>
                                                <p class="">  You can receive notifications through your notifications center </p>
                                            </div>
                                            <input type="checkbox"/><span class="switch-button !relative"></span> 
                                        </label>
                                    </div>

                                    <div class="w-full">
                                        <label class="switch flex justify-between items-center cursor-pointer gap-4">
                                            <div class="bg-teal-100 text-teal-500 rounded-full p-2 md:flex hidden shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                                </svg>
                                            </div>
                                            <div class="flex-1 md:pr-8">
                                                <h4 class="text-base font-medium mb-1.5 text-black dark:text-white"> Phone notifications</h4>
                                                <p class="">  You can receive notifications on your phone, so you can stay up-to-date even when you’re on the go</p>
                                            </div>
                                            <input type="checkbox" checked/><span class="switch-button !relative"></span> 
                                        </label>
                                    </div>
                                     
                                
                                </div>

                            </div> 

                            <div class="flex items-center justify-center gap-4 mt-16">
                                <button type="submit" class="button lg:px-6 bg-secondery max-md:flex-1"> Cancle</button>
                                <button type="submit" class="button lg:px-10 bg-primary text-white max-md:flex-1"> Save</button>
                            </div>

                        </div> 
                        
                    </div>
                    
                    <div>

                        <div>
                            
                            <div class="space-y-6 max-w-lg mx-auto">

                                <div class="md:flex items-center gap-16 justify-between max-md:space-y-3">
                                    <label class="md:w-40 text-right"> Current Password </label>
                                    <div class="flex-1 max-md:mt-4">
                                        <input type="password" placeholder="******" class="w-full"/>
                                    </div>
                                </div>
                              
                                <div class="md:flex items-center gap-16 justify-between max-md:space-y-3">
                                    <label class="md:w-40 text-right"> New password </label>
                                    <div class="flex-1 max-md:mt-4">
                                        <input type="password" placeholder="******" class="w-full"/>
                                    </div>
                                </div>

                                <div class="md:flex items-center gap-16 justify-between max-md:space-y-3">
                                    <label class="md:w-40 text-right"> Repeat password </label>
                                    <div class="flex-1 max-md:mt-4">
                                        <input type="password" placeholder="******" class="w-full"/>
                                    </div>
                                </div>

                                <hr class="border-gray-100 dark:border-gray-700"/>

                                <div class="md:flex items-center gap-16 justify-between">
                                    <label class="md:w-40 text-right"> Two-factor authentication </label>
                                    <div class="flex-1 max-md:mt-4">
                                        <select class="w-full !border-0 !rounded-md">
                                            <option value="1">Enable</option>
                                            <option value="2">Disable</option> 
                                        </select>
                                    </div>
                                </div>


                            </div>
                            
                            <div class="flex items-center justify-center gap-4 mt-16">
                                <button type="submit" class="button lg:px-6 bg-secondery max-md:flex-1"> Cancle</button>
                                <button type="submit" class="button lg:px-10 bg-primary text-white max-md:flex-1"> Save</button>
                            </div>

                        </div>
                        
                    </div>


                </div>
                
            
            </div>

            
        </div>
        
    </main>
  )
}

export default page