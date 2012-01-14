(function(w) {

	//	--------------------------
	//	Starfield : ParticleSystem
	//	--------------------------
	var Starfield = function() {
	};

	var p = Starfield.prototype = new ParticleSystem;

	p.rand = function(min, max) { 
		return Math.random() * (max - min) + min;
	};

	p.run = function(canvasId, fps) {

		var canvas = this.canvas = document.getElementById(canvasId)
			ctx = this.ctx = this.canvas.getContext('2d')
			fps = this.fps = fps || 30,
			self = this,
			self.particlesDir = [];
			
		for(var i = 0; i < self.particleNum; i++) {
			self.particlesDir[i] = new Vector2d(this.rand(-1, 1), this.rand(-1, 1));
		}
		
		this.loop = setInterval(function() {
			
			ctx.fillStyle = self.bgColor;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			for(var i = 0; i < self.particleNum; i++) {
			
				var p = self.particles[i];
			
				ctx.beginPath();
				ctx.fillStyle = p.color;
				ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2, true);
				ctx.fill();
				ctx.closePath();
				
				p.vel.x += self.totForce.x;
				p.vel.y += self.totForce.y;
				p.pos.x += p.vel.x * self.particlesDir[i].x;
				p.pos.y += p.vel.y * self.particlesDir[i].y;
				
				if(p.pos.x >= canvas.width || p.pos.x <= 0 || p.pos.y >= canvas.height || p.pos.y <= 0) {
					self.initParticle(i);
				}
				
			}
			
		}, 1000 / fps);
		
	};
	
	w.Starfield = Starfield;

})(window);